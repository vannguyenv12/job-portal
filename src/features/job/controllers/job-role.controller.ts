import { Request, Response } from 'express';
import { jobRoleService } from '../services/job-role.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class JobRoleController {
  public async create(req: Request, res: Response) {
    const jobRole = await jobRoleService.create(req.body.name);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Created job role successfully',
      data: jobRole
    });
  }

  public async readAll(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '' } = req.query;

    const { jobRoles, totalCounts } = await jobRoleService.readAll({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filter
    });

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all job roles',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data: jobRoles
    });
  }

  public async remove(req: Request, res: Response) {
    await jobRoleService.remove(req.params.name);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete job role successfully'
    });
  }
}

export const jobRoleController: JobRoleController = new JobRoleController();
