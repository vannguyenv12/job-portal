import { Request, Response } from 'express';
import { recruiterPackageService } from '../services/recruiter-package.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class RecruiterPackageController {
  public async create(req: Request, res: Response) {
    const recruiterPackage = await recruiterPackageService.create(req.body.packageId, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create recruiter package successfully',
      data: recruiterPackage
    });
  }
}

export const recruiterPackageController: RecruiterPackageController = new RecruiterPackageController();
