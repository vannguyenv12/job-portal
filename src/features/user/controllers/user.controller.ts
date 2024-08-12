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

  public async create(req: Request, res: Response, next: NextFunction) {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: true,
        role: req.body.role
      }
    });

    return res.status(201).json({
      message: 'Create user successfully',
      data: user
    });
  }
}

export const userController: UserController = new UserController();
