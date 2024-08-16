import { Request, Response } from 'express';
import { packageService } from '../services/package.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class PackageController {
  public async create(req: Request, res: Response) {
    const packageEntity = await packageService.create(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Create package successfully',
      data: packageEntity
    });
  }
}

export const packageController: PackageController = new PackageController();
