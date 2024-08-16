import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { recruiterPackageController } from '../controllers/recruiter-package.controller';

const recruiterPackageRoute = express.Router();

recruiterPackageRoute.post('/', verifyUser, allowAccess('RECRUITER'), asyncWrapper(recruiterPackageController.create));

export default recruiterPackageRoute;
