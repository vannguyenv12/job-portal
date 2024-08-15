import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { jobBenefitController } from '../controllers/job-benefit.controller';

const jobBenefitRoute = express.Router();

jobBenefitRoute.post('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobBenefitController.create));

export default jobBenefitRoute;
