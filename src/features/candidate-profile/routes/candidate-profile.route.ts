import express from 'express';
import { candidateProfileController } from '../controllers/candidate-profile.controller';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { checkPermission } from '~/globals/middlewares/checkPermission.midddleware';
const candidateProfileRoute = express.Router();

candidateProfileRoute.post('/', verifyUser, asyncWrapper(candidateProfileController.create));
candidateProfileRoute.get('/', verifyUser, asyncWrapper(candidateProfileController.readAll));
candidateProfileRoute.get('/:id', verifyUser, checkPermission, asyncWrapper(candidateProfileController.readOne));
candidateProfileRoute.patch('/:id', verifyUser, checkPermission, asyncWrapper(candidateProfileController.update));
candidateProfileRoute.delete('/:id', verifyUser, checkPermission, asyncWrapper(candidateProfileController.remove));

export default candidateProfileRoute;
