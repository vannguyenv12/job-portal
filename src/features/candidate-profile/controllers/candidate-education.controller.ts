import { Request, Response } from 'express';
import { candidateEducationService } from '../services/candidate-education.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class CandidateEducationController {
  public async create(req: Request, res: Response) {
    const candidateEducation = await candidateEducationService.create(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create candidate education successfully',
      data: candidateEducation
    });
  }
}

export const candidateEducationController: CandidateEducationController = new CandidateEducationController();
