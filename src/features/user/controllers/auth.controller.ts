import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class AuthController {
  public async signUp(req: Request, res: Response) {
    const accessToken = await authService.signUp(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Signup user successfully',
      data: accessToken
    });
  }

  public async signIn(req: Request, res: Response) {
    const accessToken = await authService.signIn(req.body);

    return res.status(HTTP_STATUS.OK).json({
      message: 'SignIn user successfully',
      data: accessToken
    });
  }
}

export const authController: AuthController = new AuthController();
