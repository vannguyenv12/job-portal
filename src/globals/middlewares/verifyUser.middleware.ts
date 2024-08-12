import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../cores/error.core';
import jwt from 'jsonwebtoken';

export async function verifyUser(req: Request, res: Response, next: NextFunction) {
  // 1) Get token from cookie
  if (!req?.cookies?.accessToken) {
    throw new BadRequestException('Please provide token');
  }
  const token = req.cookies.accessToken;
  // 2) Verify token
  const decoded = (await jwt.verify(token, process.env.JWT_SECRET!)) as UserPayload;
  const { name, email, role } = decoded;

  // 3) assign verify token from step 2, assign it to req.currentUser
  req.currentUser = { name, email, role };

  next();
}
