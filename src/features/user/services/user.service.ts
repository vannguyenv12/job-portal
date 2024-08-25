import { User } from '@prisma/client';
import prisma from '~/prisma';
import bcrypt from 'bcrypt';
import { BadRequestException, ForbiddenException, NotFoundException } from '~/globals/cores/error.core';
import { getPaginationAndFilters } from '~/globals/helpers/pagination-filter.helper';
import { checkOwner } from '~/globals/cores/checkOwner.core';
import { IUser, IUserPassword } from '../interfaces/user.interface';
import { excludeFields } from '~/globals/helpers/excludeFields.helper';
import RedisClient from '~/globals/cores/redis/redis.client';
import { userUpdateNameSchema } from '../schemas/user.schema';
import { trusted } from 'mongoose';
import RedisKey from '~/globals/constants/redis-keys.constaint';
import { userRedis } from '~/globals/cores/redis/user.redis';

class UserService {
  public async createUser(requestBody: IUser): Promise<User> {
    const { name, email, password, role } = requestBody;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        status: true,
        role
      }
    });

    return excludeFields(user, ['password']);
  }

  public async getAll({ page, limit, filter }: any) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'email'],
      entity: 'user'
    });

    const results = data.map((user: User) => excludeFields(user, ['password']));

    return { users: results, totalCounts };
  }

  public async getOne(id: number) {
    // 1) Get user 1 from redis
    const userKey = `${RedisKey.USERS_KEY}:${id}`;

    await userRedis.getUserFromRedis(userKey);
    // 3) If not

    const user: User | null = await prisma.user.findFirst({
      where: { id }
    });

    if (!user) throw new NotFoundException(`User ${id} not found`);

    // TODO: save it to redis
    await userRedis.saveUserToRedis(userKey, user);

    return excludeFields(user, ['password']);
  }

  private async findOne(id: number): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { id }
    });

    if (!user) throw new NotFoundException(`User ${id} not found`);

    return user;
  }

  public async update(id: number, name: string, currentUser: UserPayload) {
    await this.getOne(id);

    if (!checkOwner(currentUser, id)) {
      throw new ForbiddenException('You cannot update this user account');
    }

    const user = await prisma.user.update({
      where: { id },
      data: { name }
    });

    return excludeFields(user, ['password']);
  }

  public async updatePassword(id: number, requestBody: IUserPassword, currentUser: UserPayload) {
    const { currentPassword, newPassword, confirmNewPassword } = requestBody;

    const user = await this.findOne(id);

    if (!checkOwner(currentUser, id)) {
      throw new ForbiddenException('You cannot update this user account');
    }

    const isMatchPassword = await bcrypt.compare(currentPassword, user.password);

    if (!isMatchPassword) throw new BadRequestException('Invalid Password');
    if (newPassword !== confirmNewPassword) throw new BadRequestException('Passwords are not match');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword
      }
    });
  }

  public async updateStatus(id: number, status: boolean) {
    await this.getOne(id);

    await prisma.user.update({
      where: { id },
      data: { status }
    });
  }
}

export const userService: UserService = new UserService();
