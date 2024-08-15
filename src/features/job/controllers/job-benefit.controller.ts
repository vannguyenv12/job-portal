import { Request, Response } from 'express';
import { jobBenefitService } from '../services/job-benefit.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class JobBenefitController {
  public async create(req: Request, res: Response) {
    const jobBenefit = await jobBenefitService.create(req.body.jobId, req.body.benefitName, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create job benefit successfully',
      data: jobBenefit
    });
  }
}

export const jobBenefitController: JobBenefitController = new JobBenefitController();
