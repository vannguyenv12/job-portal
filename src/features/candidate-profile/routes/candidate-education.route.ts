import express from 'express';
import { candidateEducationController } from '../controllers/candidate-education.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';

const candidateEducationRoute = express.Router();

candidateEducationRoute.post('/', verifyUser, asyncWrapper(candidateEducationController.create));

export default candidateEducationRoute;
