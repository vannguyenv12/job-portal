import { User } from '@prisma/client';
import prisma from '~/prisma';
import bcrypt from 'bcrypt';
import { BadRequestException, ForbiddenException, NotFoundException } from '~/globals/cores/error.core';
import { getPaginationAndFilters } from '~/globals/helpers/pagination-filter.helper';
import { checkOwner } from '~/globals/cores/checkOwner.core';

class UserService {
  public async createUser(requestBody: any): Promise<User> {
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

    return user;
  }

  public async getAll({ page, limit, filter }: any) {
    const { data, totalCounts } = await getPaginationAndFilters({
      page,
      limit,
      filter,
      filterFields: ['name', 'email'],
      entity: 'user'
    });

    return { users: data, totalCounts };
  }

  public async getOne(id: number): Promise<User> {
    const user = await prisma.user.findFirst({
      where: { id }
    });

    if (!user) throw new NotFoundException(`User ${id} not found`);

    return user;
  }

  public async update(id: number, name: string, currentUser: UserPayload) {
    // user 2, id: 1 => don't allow
    // user 1, id: 1 => allow
    // admin, id: 1 => allow

    await this.getOne(id);

    if (!checkOwner(currentUser, id)) {
      throw new ForbiddenException('You cannot update this user account');
    }

    const user = await prisma.user.update({
      where: { id },
      data: { name }
    });

    return user;
  }

  public async updatePassword(id: number, requestBody: any, currentUser: UserPayload) {
    const { currentPassword, newPassword, confirmNewPassword } = requestBody;

    const user = await this.getOne(id);

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
