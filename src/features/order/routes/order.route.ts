import express from 'express';
import asyncWrapper from '~/globals/cores/asyncWrapper.core';
import { allowAccess } from '~/globals/middlewares/allowAccess.middleware';
import { verifyUser } from '~/globals/middlewares/verifyUser.middleware';
import { orderController } from '../controllers/order.controller';
const orderRoute = express.Router();

orderRoute.get('/', verifyUser, allowAccess('ADMIN'), asyncWrapper(orderController.read));
orderRoute.get('/me', verifyUser, allowAccess('RECRUITER'), asyncWrapper(orderController.readMyOrder));
orderRoute.get('/:id', verifyUser, allowAccess('RECRUITER', 'ADMIN'), asyncWrapper(orderController.readOne));
orderRoute.patch('/:id', verifyUser, allowAccess('ADMIN'), asyncWrapper(orderController.updateStatus));

export default orderRoute;
