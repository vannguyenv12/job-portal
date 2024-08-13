import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { candidateLanguageController } from '../controllers/candidate-language.controller';

const candidateLanguageRoute = express.Router();

candidateLanguageRoute.post('/', verifyUser, asyncWrapper(candidateLanguageController.create));

export default candidateLanguageRoute;
