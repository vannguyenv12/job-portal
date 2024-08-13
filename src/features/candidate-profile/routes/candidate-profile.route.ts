import express from 'express';
import { candidateProfileController } from '../controllers/candidate-profile.controller';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
const candidateProfileRoute = express.Router();

candidateProfileRoute.post('/', verifyUser, asyncWrapper(candidateProfileController.create));
candidateProfileRoute.get('/', verifyUser, asyncWrapper(candidateProfileController.readAll));
candidateProfileRoute.get('/:id', verifyUser, asyncWrapper(candidateProfileController.readOne));
candidateProfileRoute.patch('/:id', verifyUser, asyncWrapper(candidateProfileController.update));

export default candidateProfileRoute;
