import { Request, Response } from 'express';
import { companyService } from '../services/company.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class CompanyController {
  public async create(req: Request, res: Response) {
    const company = await companyService.create(req.body, req.currentUser);

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Create company successfully',
      data: company
    });
  }
}

export const companyController: CompanyController = new CompanyController();
