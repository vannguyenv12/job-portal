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

  public async readAll(req: Request, res: Response) {
    const candidateEducations = await candidateEducationService.readAll();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all candidate educations',
      data: candidateEducations
    });
  }

  public async readMyEducations(req: Request, res: Response) {
    const candidateEducations = await candidateEducationService.readMyEducations(req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get my candidate educations',
      data: candidateEducations
    });
  }

  public async update(req: Request, res: Response) {
    const candidateEducation = await candidateEducationService.update(
      parseInt(req.params.educationId),
      req.body,
      req.currentUser
    );

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update candidate education successfully',
      data: candidateEducation
    });
  }
}

export const candidateEducationController: CandidateEducationController = new CandidateEducationController();
