import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { authController } from '../controllers/auth.controller';

const authRoute = express.Router();

authRoute.post('/signup', asyncWrapper(authController.signUp));
authRoute.post('/sign-in', asyncWrapper(authController.signIn));

export default authRoute;
