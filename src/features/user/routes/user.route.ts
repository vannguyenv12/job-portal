import express from 'express';
import { userController } from '../controllers/user.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';
import { userCreateSchema } from '../schemas/user.schema';

const userRoute = express.Router();

userRoute.get('/', userController.getAll);
userRoute.post('/', validateSchema(userCreateSchema), asyncWrapper(userController.create));

export default userRoute;
