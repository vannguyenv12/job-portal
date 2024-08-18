import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class UserController {
  public async getAll(req: Request, res: Response) {
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

  public async create(req: Request, res: Response) {
    const user = await userService.createUser(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create user successfully',
      data: user
    });
  }

  public async update(req: Request, res: Response) {
    const user = await userService.update(parseInt(req.params.id), req.body.name, req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update user successfully',
      data: user
    });
  }

  public async updatePassword(req: Request, res: Response) {
    await userService.updatePassword(parseInt(req.params.id), req.body, req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update password successfully'
    });
  }

  public async updateStatus(req: Request, res: Response) {
    await userService.updateStatus(parseInt(req.params.id), req.body.status);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update status successfully'
    });
  }
}

export const userController: UserController = new UserController();
