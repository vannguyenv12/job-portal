import { Request, Response } from 'express';
import { jobSkillService } from '../services/job-skill.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class JobSkillController {
  public async create(req: Request, res: Response) {
    const jobSkill = await jobSkillService.create(req.body.jobId, req.body.skillName, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create job skill successfully',
      data: jobSkill
    });
  }
}

export const jobSkillController: JobSkillController = new JobSkillController();
