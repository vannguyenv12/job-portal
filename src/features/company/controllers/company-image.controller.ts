import { Request, Response } from 'express';
import { companyImageService } from '../services/company-image.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class CompanyImageController {
  public async add(req: Request, res: Response) {
    await companyImageService.add(parseInt(req.params.companyId), req.currentUser, req.files as Express.Multer.File[]);

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Add image to company successfully'
    });
  }
}

export const companyImageController: CompanyImageController = new CompanyImageController();
