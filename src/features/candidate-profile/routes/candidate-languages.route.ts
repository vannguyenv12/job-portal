import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { validateSchema } from '~/globals/middlewares/validateSchema.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { candidateLanguageController } from '../controllers/candidate-language.controller';
import { candidateLanguageCreateSchema, candidateLanguageUpdateSchema } from '../schemas/candidate-language.schema';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';

const candidateLanguageRoute = express.Router();

candidateLanguageRoute.post(
  '/',
  verifyUser,
  validateSchema(candidateLanguageCreateSchema),
  asyncWrapper(candidateLanguageController.create)
);
candidateLanguageRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(candidateLanguageController.readAll));
candidateLanguageRoute.get('/me', verifyUser, asyncWrapper(candidateLanguageController.readMyLanguages));
candidateLanguageRoute.patch(
  '/:languageName',
  verifyUser,
  validateSchema(candidateLanguageUpdateSchema),
  asyncWrapper(candidateLanguageController.updateLevel)
);
candidateLanguageRoute.delete('/:languageName', verifyUser, asyncWrapper(candidateLanguageController.remove));

export default candidateLanguageRoute;
