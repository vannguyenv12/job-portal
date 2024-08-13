import express from 'express';
import { candidateEducationController } from '../controllers/candidate-education.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';
import { candidateEducationCreateSchema, candidateEducationUpdateSchema } from '../schemas/candidate-education.schema';

const candidateEducationRoute = express.Router();

candidateEducationRoute.post(
  '/',
  verifyUser,
  validateSchema(candidateEducationCreateSchema),
  asyncWrapper(candidateEducationController.create)
);
candidateEducationRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(candidateEducationController.readAll));
candidateEducationRoute.get('/me', verifyUser, asyncWrapper(candidateEducationController.readMyEducations));
candidateEducationRoute.patch(
  '/:educationId',
  verifyUser,
  validateSchema(candidateEducationUpdateSchema),
  asyncWrapper(candidateEducationController.update)
);
candidateEducationRoute.delete('/:educationId', verifyUser, asyncWrapper(candidateEducationController.remove));

export default candidateEducationRoute;
