import { Request, Response } from 'express';
import { candidateExperienceService } from '../services/candidate-experience.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class CandidateExperienceController {
  public async create(req: Request, res: Response) {
    const candidateExperience = await candidateExperienceService.create(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create candidate experience successfully',
      data: candidateExperience
    });
  }
}

export const candidateExperienceController: CandidateExperienceController = new CandidateExperienceController();
