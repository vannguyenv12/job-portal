import express from 'express';
import { candidateExperienceController } from '../controllers/candidate-experience.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';
import {
  candidateExperienceCreateSchema,
  candidateExperienceUpdateSchema
} from '../schemas/candidate-experience.schema';

const candidateExperienceRoute = express.Router();

candidateExperienceRoute.post(
  '/',
  verifyUser,
  validateSchema(candidateExperienceCreateSchema),
  asyncWrapper(candidateExperienceController.create)
);
candidateExperienceRoute.get(
  '/',
  verifyUser,
  allowAccess('ADMIN'),
  asyncWrapper(candidateExperienceController.readAll)
);
candidateExperienceRoute.get('/me', verifyUser, asyncWrapper(candidateExperienceController.readMyExperiences));
candidateExperienceRoute.patch(
  '/:id',
  verifyUser,
  validateSchema(candidateExperienceUpdateSchema),
  asyncWrapper(candidateExperienceController.update)
);
candidateExperienceRoute.delete('/:id', verifyUser, asyncWrapper(candidateExperienceController.remove));

export default candidateExperienceRoute;
