import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { jobController } from '../controllers/job.controller';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';
import { jobCreateSchema, jobUpdateSchema } from '../schemas/job.schema';

const jobRoute = express.Router();

jobRoute.post(
  '/',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(jobCreateSchema),
  asyncWrapper(jobController.create)
);
jobRoute.get('/', asyncWrapper(jobController.readAll));
jobRoute.get('/me', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobController.readAllForRecruiter));
jobRoute.get('/:id', asyncWrapper(jobController.readOne));
jobRoute.patch(
  '/:id/:companyId/status',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(jobUpdateSchema),
  asyncWrapper(jobController.updateStatus)
);
jobRoute.patch(
  '/:id/:companyId',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(jobUpdateSchema),
  asyncWrapper(jobController.update)
);
jobRoute.delete('/:id/:companyId', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobController.remove));

export default jobRoute;
