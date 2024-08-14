import { Request, Response } from 'express';
import { candidateSkillService } from '../services/candidate-skill.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class CandidateSkillController {
  public async create(req: Request, res: Response) {
    const candidateSkill = await candidateSkillService.create(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create candidate skill successfully',
      data: candidateSkill
    });
  }
}

export const candidateSkillController: CandidateSkillController = new CandidateSkillController();
