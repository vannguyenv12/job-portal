import { NextFunction, Request, Response } from 'express';
import { candidateProfileService } from '../services/candidate-profile.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class CandidateProfileController {
  public async create(req: Request, res: Response) {
    const candidateProfile = await candidateProfileService.create(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create candidate profile successfully',
      data: candidateProfile
    });
  }

  public async readAll(req: Request, res: Response) {
    const candidates = await candidateProfileService.readAll();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all candidate profiles successfully',
      data: candidates
    });
  }

  public async readOne(req: Request, res: Response) {
    const candidate = await candidateProfileService.readOne(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get one candidate profile successfully',
      data: candidate
    });
  }
}

export const candidateProfileController: CandidateProfileController = new CandidateProfileController();
