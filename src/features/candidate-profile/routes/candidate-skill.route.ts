import express from 'express';
import { candidateSkillController } from '../controllers/candidate-skill.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';

const candidateSkillRoute = express.Router();

candidateSkillRoute.post('/', verifyUser, asyncWrapper(candidateSkillController.create));

export default candidateSkillRoute;
