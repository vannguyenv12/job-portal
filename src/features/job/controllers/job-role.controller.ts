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
}

export const jobRoleController: JobRoleController = new JobRoleController();
