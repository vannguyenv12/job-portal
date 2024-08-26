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

  public async readAllForAdmin(req: Request, res: Response) {
    const { page = 1, limit = 5, filter = '' } = req.query;

    const { companies, totalCounts } = await companyService.readAllPaginationForAdmin({
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

  public async readOneAdmin(req: Request, res: Response) {
    const company = await companyService.readOneAdmin(parseInt(req.params.id));

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get single company',
      data: company
    });
  }
  public async readOne(req: Request, res: Response) {
    const company = await companyService.readOne(parseInt(req.params.id), req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get single company',
      data: company
    });
  }

  public async update(req: Request, res: Response) {
    const company = await companyService.update(parseInt(req.params.id), req.body, req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Update company successfully',
      data: company
    });
  }

  public async approved(req: Request, res: Response) {
    const company = await companyService.approved(parseInt(req.params.id), req.body.isApproved);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Change approved successfully',
      data: company
    });
  }

  public async remove(req: Request, res: Response) {
    await companyService.remove(parseInt(req.params.id), req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Delete company successfully'
    });
  }
}

export const companyController: CompanyController = new CompanyController();
