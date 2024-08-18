import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class UserController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    const { page = 1, limit = 5, filter = '' } = req.query;

    const { users, totalCounts } = await userService.getAll({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filter
    });

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all users successfully',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data: users
    });
  }

  public async getOne(req: Request, res: Response) {
    const user = await userService.getOne(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get user successfully',
      data: user
    });
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const user = await userService.createUser(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create user successfully',
      data: user
    });
  }
}

export const userController: UserController = new UserController();
