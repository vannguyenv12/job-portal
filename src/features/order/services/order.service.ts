import { Order } from '@prisma/client';
import { packageService } from '~/features/package/services/package.service';
import prisma from '~/prisma';

class OrderService {
  public async create(packageId: number, currentUser: UserPayload): Promise<Order> {
    const packageEntity = await packageService.readOne(packageId);

    const order = await prisma.order.create({
      data: {
        packageId,
        recruiterId: currentUser.id,
        totalPrice: packageEntity.price
      }
    });

    return order;
  }

  public async read(): Promise<Order[]> {
    const orders = await prisma.order.findMany();

    return orders;
  }

  public async readMyOrders(currentUser: UserPayload): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { recruiterId: currentUser.id }
    });

    return orders;
  }
}

export const orderService: OrderService = new OrderService();
