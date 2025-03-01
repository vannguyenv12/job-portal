import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { companyImageController } from '../controllers/company-image.controller';
import { uploadCompanyImage } from '~/globals/helpers/upload.helper';

const companyImageRoute = express.Router();

companyImageRoute.post(
  '/:companyId',
  verifyUser,
  allowAccess('RECRUITER'),
  uploadCompanyImage.array('images'),
  asyncWrapper(companyImageController.add)
);

companyImageRoute.get('/:companyId', asyncWrapper(companyImageController.readAll));
companyImageRoute.delete(
  '/:companyId/:companyImageId',
  verifyUser,
  allowAccess('RECRUITER'),
  asyncWrapper(companyImageController.remove)
);

export default companyImageRoute;
