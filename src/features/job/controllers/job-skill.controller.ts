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

  public async read(req: Request, res: Response) {
    const jobSkills = await jobSkillService.read(parseInt(req.params.jobId));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all job skills',
      data: jobSkills
    });
  }
}

export const jobSkillController: JobSkillController = new JobSkillController();
