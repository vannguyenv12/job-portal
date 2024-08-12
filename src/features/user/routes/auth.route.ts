import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { authController } from '../controllers/auth.controller';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';

const authRoute = express.Router();

authRoute.post('/signup', asyncWrapper(authController.signUp));
authRoute.post('/sign-in', asyncWrapper(authController.signIn));
authRoute.get('/me', verifyUser, asyncWrapper(authController.getCurrentUser));

export default authRoute;
