import express from 'express';
import { candidateProfileController } from '../controllers/candidate-profile.controller';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
const candidateProfileRoute = express.Router();

candidateProfileRoute.post('/', verifyUser, candidateProfileController.create);

export default candidateProfileRoute;
