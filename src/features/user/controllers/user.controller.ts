import { NextFunction, Request, Response } from 'express';

class UserController {
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      message: 'Get all users successfully',
      data: []
    });
  }
}

export const userController: UserController = new UserController();
