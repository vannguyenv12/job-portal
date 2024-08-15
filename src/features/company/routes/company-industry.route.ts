import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { companyIndustryController } from '../controllers/company-industry.controller';

const companyIndustryRoute = express.Router();

companyIndustryRoute.post(
  '/:companyId',
  verifyUser,
  allowAccess('RECRUITER'),
  asyncWrapper(companyIndustryController.add)
);

companyIndustryRoute.get('/:companyId', asyncWrapper(companyIndustryController.read));

export default companyIndustryRoute;
