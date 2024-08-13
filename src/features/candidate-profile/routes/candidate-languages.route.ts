import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';

const candidateLanguageRoute = express.Router();

candidateLanguageRoute.get('/');

export default candidateLanguageRoute;
