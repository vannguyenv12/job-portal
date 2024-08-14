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

  public async readAll(req: Request, res: Response) {
    const candidateSkills = await candidateSkillService.findAll();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all candidate skills',
      data: candidateSkills
    });
  }

  public async readMySkills(req: Request, res: Response) {
    const candidateSkills = await candidateSkillService.findMySkills(req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get my candidate skills',
      data: candidateSkills
    });
  }
}

export const candidateSkillController: CandidateSkillController = new CandidateSkillController();
