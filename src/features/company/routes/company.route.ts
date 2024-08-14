import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { companyController } from '../controllers/company.controller';
const companyRoute = express.Router();

companyRoute.post('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(companyController.create));
companyRoute.get('/', asyncWrapper(companyController.readAll));
companyRoute.get('/admin', verifyUser, allowAccess('ADMIN'), asyncWrapper(companyController.readAllForAdmin));
companyRoute.get('/me', verifyUser, allowAccess('RECRUITER'), asyncWrapper(companyController.readMyCompanies));
companyRoute.get('/:id', asyncWrapper(companyController.readOne));
companyRoute.get('/:id/admin', verifyUser, allowAccess('ADMIN'), asyncWrapper(companyController.readOneAdmin));
companyRoute.patch('/:id', verifyUser, allowAccess('RECRUITER'), asyncWrapper(companyController.update));
companyRoute.patch('/approved/:id', verifyUser, allowAccess('ADMIN'), asyncWrapper(companyController.approved));

export default companyRoute;
