import { Request, Response } from 'express';

class AuthController {
  public async signUp(req: Request, res: Response) {}
}

export const authController: AuthController = new AuthController();
