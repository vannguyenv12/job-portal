import { User } from '@prisma/client';
import prisma from '~/prisma';
import bcrypt from 'bcrypt';

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

  public async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }
}

export const userService: UserService = new UserService();
