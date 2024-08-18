import express from 'express';
import { userController } from '../controllers/user.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';
import { userCreateSchema } from '../schemas/user.schema';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { checkPermission } from '~/globals/middlewares/checkPermission.midddleware';

const userRoute = express.Router();

userRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(userController.getAll));
userRoute.get('/:id', verifyUser, allowAccess('ADMIN'), asyncWrapper(userController.getOne));
userRoute.post(
  '/',
  verifyUser,
  allowAccess('ADMIN'),
  validateSchema(userCreateSchema),
  asyncWrapper(userController.create)
);

userRoute.patch('/:id', verifyUser, asyncWrapper(userController.update));

export default userRoute;
