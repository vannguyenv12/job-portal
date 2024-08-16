import { Request, Response } from 'express';
import { applyService } from '../services/apply.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class ApplyController {
  public async create(req: Request, res: Response) {
    const apply = await applyService.create(req.body.jobId, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Apply job successfully',
      data: apply
    });
  }
}

export const applyController: ApplyController = new ApplyController();
