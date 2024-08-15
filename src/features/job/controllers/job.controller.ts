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

  public async readAll(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '' } = req.query;

    const { jobs, totalCounts } = await jobService.readAll({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filter
    });

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all jobs',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data: jobs
    });
  }
}

export const jobController: JobController = new JobController();
