import express from 'express';
import { userController } from '../controllers/user.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';
import { userCreateSchema } from '../schemas/user.schema';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';

const userRoute = express.Router();

userRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(userController.getAll));
userRoute.post(
  '/',
  verifyUser,
  allowAccess('ADMIN'),
  validateSchema(userCreateSchema),
  asyncWrapper(userController.create)
);

export default userRoute;
