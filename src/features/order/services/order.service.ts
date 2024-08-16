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
}

export const orderService: OrderService = new OrderService();
