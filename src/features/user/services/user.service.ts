import { User } from '@prisma/client';
import prisma from '~/prisma';

class UserService {
  public async createUser(requestBody: any): Promise<User> {
    const { name, email, password, role } = requestBody;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        status: true,
        role
      }
    });

    return user;
  }

  public async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }
}

export const userService: UserService = new UserService();
