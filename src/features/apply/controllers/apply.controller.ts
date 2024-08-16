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

  public async readMe(req: Request, res: Response) {
    const { page = 1, limit = 5 } = req.query;

    const { applies, totalCounts } = await applyService.readMe(
      { page: parseInt(page as string), limit: parseInt(limit as string) },
      req.currentUser
    );

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get my applications',
      pagination: {
        totalCounts,
        currentPage: parseInt(page as string)
      },
      data: applies
    });
  }
}

export const applyController: ApplyController = new ApplyController();
