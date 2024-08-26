import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { companyController } from '../controllers/company.controller';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';
import { companyApprovedSchema, companyCreateSchema, companyUpdateSchema } from '../schemas/company.schema';
const companyRoute = express.Router();

companyRoute.post(
  '/',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(companyCreateSchema),
  asyncWrapper(companyController.create)
);
companyRoute.get('/', asyncWrapper(companyController.readAll));
companyRoute.get('/admin', verifyUser, allowAccess('ADMIN'), asyncWrapper(companyController.readAllForAdmin));
companyRoute.get('/me', verifyUser, allowAccess('RECRUITER'), asyncWrapper(companyController.readMyCompanies));
companyRoute.get('/:id', verifyUser, asyncWrapper(companyController.readOne));
companyRoute.get('/:id/admin', verifyUser, allowAccess('ADMIN'), asyncWrapper(companyController.readOneAdmin));
companyRoute.patch(
  '/:id',
  verifyUser,
  allowAccess('RECRUITER'),
  validateSchema(companyUpdateSchema),
  asyncWrapper(companyController.update)
);
companyRoute.patch(
  '/approved/:id',
  verifyUser,
  allowAccess('ADMIN'),
  validateSchema(companyApprovedSchema),
  asyncWrapper(companyController.approved)
);
companyRoute.delete('/:id', verifyUser, allowAccess('RECRUITER'), asyncWrapper(companyController.remove));

export default companyRoute;
