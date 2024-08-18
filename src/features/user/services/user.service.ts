import { User } from '@prisma/client';
import prisma from '~/prisma';
import bcrypt from 'bcrypt';
import { NotFoundException } from '~/globals/cores/error.core';
import { getPaginationAndFilters } from '~/globals/helpers/pagination-filter.helper';

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
}

export const userService: UserService = new UserService();
