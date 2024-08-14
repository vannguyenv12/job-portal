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

  public async readAll(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '' } = req.query;

    const { companies, totalCounts } = await companyService.readAllPagination({
      page: parseInt(page as string),
      limit: parseInt(limit as string),
      filter
    });

    res.status(HTTP_STATUS.OK).json({
      message: 'Get all companies',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data: companies
    });
  }

  public async readMyCompanies(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '' } = req.query;

    const { companies, totalCounts } = await companyService.readMyCompanies(
      {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        filter
      },
      req.currentUser
    );

    res.status(HTTP_STATUS.OK).json({
      message: 'Get my companies',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data: companies
    });
  }
  public async readOne(req: Request, res: Response) {
    const company = await companyService.readOne(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get single company',
      data: company
    });
  }
}

export const companyController: CompanyController = new CompanyController();
