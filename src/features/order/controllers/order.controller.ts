import { Request, Response } from 'express';
import { orderService } from '../services/order.service';
import HTTP_STATUS from '~/globals/constants/http.constant';

class OrderController {
  public async read(req: Request, res: Response) {
    const orders = await orderService.read();

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all orders',
      data: orders
    });
  }

  public async readMyOrder(req: Request, res: Response) {
    const orders = await orderService.readMyOrders(req.currentUser);

    return res.status(HTTP_STATUS.OK).json({
      message: 'Get all orders',
      data: orders
    });
  }
}

export const orderController: OrderController = new OrderController();
