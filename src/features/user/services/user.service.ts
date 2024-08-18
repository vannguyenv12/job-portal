import { User } from '@prisma/client';
import prisma from '~/prisma';
import bcrypt from 'bcrypt';
import { ForbiddenException, NotFoundException } from '~/globals/cores/error.core';
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
}

export const userService: UserService = new UserService();
