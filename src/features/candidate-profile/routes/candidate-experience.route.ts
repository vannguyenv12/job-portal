import express from 'express';
import { candidateExperienceController } from '../controllers/candidate-experience.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';

const candidateExperienceRoute = express.Router();

candidateExperienceRoute.post('/', verifyUser, asyncWrapper(candidateExperienceController.create));
candidateExperienceRoute.get(
  '/',
  verifyUser,
  allowAccess('ADMIN'),
  asyncWrapper(candidateExperienceController.readAll)
);
candidateExperienceRoute.get('/me', verifyUser, asyncWrapper(candidateExperienceController.readMyExperiences));

export default candidateExperienceRoute;
