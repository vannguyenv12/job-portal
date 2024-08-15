import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { jobController } from '../controllers/job.controller';

const jobRoute = express.Router();

jobRoute.post('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobController.create));
jobRoute.get('/', asyncWrapper(jobController.readAll));
export default jobRoute;
