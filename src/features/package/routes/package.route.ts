import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { packageController } from '../controllers/package.controller';

const packageRoute = express.Router();

packageRoute.post('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(packageController.create));

export default packageRoute;
