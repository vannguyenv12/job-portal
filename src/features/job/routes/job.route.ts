import express from 'express';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';

const jobRoute = express.Router();

jobRoute.post('/', verifyUser, allowAccess('ADMIN'));
export default jobRoute;
