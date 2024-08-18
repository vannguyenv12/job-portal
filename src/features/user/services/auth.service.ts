import prisma from '~/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BadRequestException, ForbiddenException, NotFoundException } from '~/globals/cores/error.core';
import { generateToken } from '~/globals/helpers/jwt.helper';
import { User } from '@prisma/client';

class AuthService {
  public async signUp(requestBody: any) {
    const { email, name, password } = requestBody;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    });

    // Create JWT
    const accessToken = generateToken(user);

    return accessToken;
  }

  public async signIn(requestBody: any) {
    const { email, password } = requestBody;

    // 1) Make sure email exist
    const userByEmail = await this.findUserByEmail(email);
    if (!userByEmail) throw new BadRequestException('Invalid Credentials');
    // 2) Make sure match password
    const isMatchPassword = await bcrypt.compare(password, userByEmail.password);
    if (!isMatchPassword) throw new BadRequestException('Invalid Credentials');

    if (!userByEmail.status) throw new ForbiddenException('The user does not available');

    // 3) Generate JWT
    const accessToken = generateToken(userByEmail);

    return accessToken;
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: { email }
    });
  }
}

export const authService: AuthService = new AuthService();
