import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../cores/error.core';
import jwt from 'jsonwebtoken';

export async function verifyUser(req: Request, res: Response, next: NextFunction) {
  // 1) Get token from cookie
  if (!req?.cookies?.accessToken) {
    // throw new BadRequestException('Please login again!');
    next(new BadRequestException('Please login again!'));
  }
  const token = req.cookies.accessToken;
  // 2) Verify token
  try {
    const decoded = (await jwt.verify(token, process.env.JWT_SECRET!)) as UserPayload;
    const { name, email, role, id } = decoded;

    // 3) assign verify token from step 2, assign it to req.currentUser
    req.currentUser = { id, name, email, role };

    next();
  } catch (error: any) {
    // throw new BadRequestException('Please login again!');
    next(new BadRequestException('Please login again!'));
  }
}

export async function verifyUserOrNot(req: Request, res: Response, next: NextFunction) {
  // 1) Get token from cookie
  if (!req?.cookies?.accessToken) {
    // throw new BadRequestException('Please login again!');
    return next();
  }
  const token = req.cookies.accessToken;
  // 2) Verify token
  try {
    const decoded = (await jwt.verify(token, process.env.JWT_SECRET!)) as UserPayload;
    const { name, email, role, id } = decoded;

    // 3) assign verify token from step 2, assign it to req.currentUser
    req.currentUser = { id, name, email, role };

    return next();
  } catch (error: any) {
    // throw new BadRequestException('Please login again!');
    return next();
  }
}
