import { Request, Response } from 'express';
import { candidateLanguageService } from '../services/candidate-language.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class CandidateLanguageController {
  public async create(req: Request, res: Response) {
    const candidateLanguage = await candidateLanguageService.create(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create candidate language successfully',
      data: candidateLanguage
    });
  }

  public async readAll(req: Request, res: Response) {
    const candidateLanguages = await candidateLanguageService.readAll();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all candidate languages',
      data: candidateLanguages
    });
  }

  public async readMyLanguages(req: Request, res: Response) {
    const candidateLanguages = await candidateLanguageService.readMyLanguages(req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get my candidate languages',
      data: candidateLanguages
    });
  }

  public async updateLevel(req: Request, res: Response) {
    const candidateLanguage = await candidateLanguageService.updateLevel(
      req.currentUser,
      req.params.languageName,
      req.body.level
    );

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update candidate language',
      data: candidateLanguage
    });
  }
}

export const candidateLanguageController: CandidateLanguageController = new CandidateLanguageController();
