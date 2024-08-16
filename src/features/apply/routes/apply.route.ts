import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { applyController } from '../controllers/apply.controller';

const applyRoute = express.Router();

applyRoute.post('/', verifyUser, allowAccess('CANDIDATE'), asyncWrapper(applyController.create));

export default applyRoute;
