import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';

const jobBenefitRoute = express.Router();

jobBenefitRoute.post('/', verifyUser, allowAccess('RECRUITER'));

export default jobBenefitRoute;
