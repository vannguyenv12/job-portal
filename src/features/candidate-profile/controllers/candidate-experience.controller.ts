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

  public async readAll(req: Request, res: Response) {
    const candidateExperiences = await candidateExperienceService.readAll();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all candidate experiences',
      data: candidateExperiences
    });
  }

  public async readMyExperiences(req: Request, res: Response) {
    const candidateExperiences = await candidateExperienceService.readMyExperiences(req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get my candidate experiences',
      data: candidateExperiences
    });
  }

  public async update(req: Request, res: Response) {
    const candidateExperience = await candidateExperienceService.update(
      parseInt(req.params.id),
      req.body,
      req.currentUser
    );

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update candidate experience successfully',
      data: candidateExperience
    });
  }

  public async remove(req: Request, res: Response) {
    await candidateExperienceService.remove(parseInt(req.params.id), req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete candidate experience successfully'
    });
  }
}

export const candidateExperienceController: CandidateExperienceController = new CandidateExperienceController();
