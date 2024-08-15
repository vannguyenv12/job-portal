import { Request, Response } from 'express';
import { companyIndustryService } from '../services/company-industry.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class CompanyIndustryController {
  public async add(req: Request, res: Response) {
    const companyIndustry = await companyIndustryService.add(
      parseInt(req.params.companyId),
      req.body.industryName,
      req.currentUser
    );

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Add industry to company successfully',
      data: companyIndustry
    });
  }
}

export const companyIndustryController: CompanyIndustryController = new CompanyIndustryController();
