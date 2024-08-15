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

  public async read(req: Request, res: Response) {
    const companyIndustries = await companyIndustryService.read(parseInt(req.params.companyId));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all company industries',
      data: companyIndustries
    });
  }
}

export const companyIndustryController: CompanyIndustryController = new CompanyIndustryController();
