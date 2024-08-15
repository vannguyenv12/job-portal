import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { jobController } from '../controllers/job.controller';

const jobRoute = express.Router();

jobRoute.post('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobController.create));
jobRoute.get('/', asyncWrapper(jobController.readAll));
jobRoute.get('/me', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobController.readAllForRecruiter));
jobRoute.get('/:id', asyncWrapper(jobController.readOne));
jobRoute.patch('/:id/:companyId', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobController.update));

export default jobRoute;
