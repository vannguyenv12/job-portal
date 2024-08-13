import express from 'express';
import { candidateEducationController } from '../controllers/candidate-education.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';

const candidateEducationRoute = express.Router();

candidateEducationRoute.post('/', verifyUser, asyncWrapper(candidateEducationController.create));
candidateEducationRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(candidateEducationController.readAll));
candidateEducationRoute.get('/me', verifyUser, asyncWrapper(candidateEducationController.readMyEducations));
candidateEducationRoute.patch('/:educationId', verifyUser, asyncWrapper(candidateEducationController.update));

export default candidateEducationRoute;
