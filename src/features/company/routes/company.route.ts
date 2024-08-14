import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { companyController } from '../controllers/company.controller';
const companyRoute = express.Router();

companyRoute.post('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(companyController.create));

export default companyRoute;
