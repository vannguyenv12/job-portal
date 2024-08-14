import express from 'express';
import { candidateSkillController } from '../controllers/candidate-skill.controller';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';

const candidateSkillRoute = express.Router();

candidateSkillRoute.post('/', verifyUser, asyncWrapper(candidateSkillController.create));
candidateSkillRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(candidateSkillController.readAll));
candidateSkillRoute.get('/me', verifyUser, asyncWrapper(candidateSkillController.readMySkills));
candidateSkillRoute.delete('/:skillName', verifyUser, asyncWrapper(candidateSkillController.remove));

export default candidateSkillRoute;
