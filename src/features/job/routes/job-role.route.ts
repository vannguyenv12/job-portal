import express from 'express';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { jobRoleController } from '../controllers/job-role.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';

const jobRoleRoute = express.Router();

jobRoleRoute.post('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(jobRoleController.create));
jobRoleRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(jobRoleController.readAll));
jobRoleRoute.delete('/:name', verifyUser, allowAccess('ADMIN'), asyncWrapper(jobRoleController.remove));

export default jobRoleRoute;
