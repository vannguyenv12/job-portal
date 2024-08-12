import express from 'express';
import { userController } from '../controllers/user.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';

const userRoute = express.Router();

userRoute.get('/', userController.getAll);
userRoute.post('/', asyncWrapper(userController.create));

export default userRoute;
