import express from 'express';
import { candidateExperienceController } from '../controllers/candidate-experience.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';

const candidateExperienceRoute = express.Router();

candidateExperienceRoute.post('/', verifyUser, asyncWrapper(candidateExperienceController.create));

export default candidateExperienceRoute;
