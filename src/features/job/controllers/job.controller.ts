import { Request, Response } from 'express';
import { jobService } from '../services/job.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class JobController {
  public async create(req: Request, res: Response) {
    const job = await jobService.create(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Created job successfully',
      data: job
    });
  }
}

export const jobController: JobController = new JobController();
