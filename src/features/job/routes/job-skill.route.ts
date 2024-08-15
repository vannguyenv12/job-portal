import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { jobSkillController } from '../controllers/job-skill.controller';

const jobSkillRoute = express.Router();

jobSkillRoute.post('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(jobSkillController.create));
jobSkillRoute.get('/:jobId', asyncWrapper(jobSkillController.read));

export default jobSkillRoute;
