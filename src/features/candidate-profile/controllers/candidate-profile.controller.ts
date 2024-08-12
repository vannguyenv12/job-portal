import { NextFunction, Request, Response } from 'express';
import { candidateProfileService } from '../services/candidate-profile.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class CandidateProfileController {
  public async create(req: Request, res: Response, next: NextFunction) {
    const candidateProfile = await candidateProfileService.create(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create candidate profile successfully',
      data: candidateProfile
    });
  }
}

export const candidateProfileController: CandidateProfileController = new CandidateProfileController();
