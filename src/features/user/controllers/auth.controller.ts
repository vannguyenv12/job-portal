import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import HTTP_STATUS from '~/globals/constants/http.constant';
import { sendTokenToCookie } from '~/globals/helpers/cookie.helper';

class AuthController {
  public async signUp(req: Request, res: Response) {
    const accessToken = await authService.signUp(req.body);

    sendTokenToCookie(res, accessToken);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Signup user successfully'
    });
  }

  public async signIn(req: Request, res: Response) {
    const accessToken = await authService.signIn(req.body);

    sendTokenToCookie(res, accessToken);

    return res.status(HTTP_STATUS.OK).json({
      message: 'SignIn user successfully'
    });
  }
}

export const authController: AuthController = new AuthController();
