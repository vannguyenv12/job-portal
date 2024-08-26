import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser, verifyUserOrNot } from '~/globals/middlewares/verifyUser.middleware';
import { companyController } from '../controllers/company.controller';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';
import { companyApprovedSchema, companyCreateSchema, companyUpdateSchema } from '../schemas/company.schema';
import { incrementView } from '~/globals/middlewares/incrementView.middleware';
import RedisKey from '~/globals/constants/redis-keys.constaint';
import { companyRedis } from '~/globals/cores/redis/company.redis';
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

const incrementViewMiddleware = incrementView(
  (id) => `${RedisKey.COMPANiES_KEY}:${id}`,
  (id) => `company_views:${id}`,
  (redisViewKey, userId) => companyRedis.checkUserInSet(redisViewKey, userId),
  (redisKey) => companyRedis.incrementCompanyView(redisKey),
  (redisViewKey, userId) => companyRedis.addUserToSet(redisViewKey, userId)
);

companyRoute.get('/:id', verifyUserOrNot, incrementViewMiddleware, asyncWrapper(companyController.readOne));

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
