import { NextFunction, Request, Response } from 'express';
import prisma from '~/prisma';

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const users = await prisma.user.findMany();

    res.status(200).json({
      message: 'Get all users successfully',
      data: users
    });
  }
}

export const userController: UserController = new UserController();
