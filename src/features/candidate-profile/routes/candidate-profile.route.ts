import express from 'express';
import { candidateProfileController } from '../controllers/candidate-profile.controller';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { checkPermission } from '~/globals/middlewares/checkPermission.midddleware';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';
import { candidateProfileCreateSchema, candidateProfileUpdateSchema } from '../schemas/candidate-profile.schema';
const candidateProfileRoute = express.Router();

candidateProfileRoute.post(
  '/',
  verifyUser,
  validateSchema(candidateProfileCreateSchema),
  asyncWrapper(candidateProfileController.create)
);
candidateProfileRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(candidateProfileController.readAll));
candidateProfileRoute.get(
  '/:id',
  verifyUser,
  checkPermission('candidateProfile', 'userId'),
  asyncWrapper(candidateProfileController.readOne)
);
candidateProfileRoute.patch(
  '/:id',
  verifyUser,
  validateSchema(candidateProfileUpdateSchema),
  checkPermission('candidateProfile', 'userId'),
  asyncWrapper(candidateProfileController.update)
);
candidateProfileRoute.delete(
  '/:id',
  verifyUser,
  checkPermission('candidateProfile', 'userId'),
  asyncWrapper(candidateProfileController.remove)
);

export default candidateProfileRoute;
