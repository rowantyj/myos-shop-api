import { PrismaClient, Order } from '@prisma/client';
import { CreateOrderDto } from '@dtos/orders.dto';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class OrderService {
  [x: string]: any;
  public order = new PrismaClient().order;

  public async findAllOrder(): Promise<Order[]> {
    const allOrder: Order[] = await this.order.findMany({
      include: {
        items: true,
      },
    });
    return allOrder;
  }

  public async findOrderById(orderId: number): Promise<Order> {
    if (isEmpty(orderId)) throw new HttpException(400, 'OrderId is empty');

    const findOrder: Order = await this.order.findUnique({
      where: { id: orderId },
    });
    if (!findOrder) throw new HttpException(409, "Order doesn't exist");

    return findOrder;
  }

  public async createOrder(orderData: CreateOrderDto): Promise<Order> {
    if (isEmpty(orderData)) throw new HttpException(400, 'orderData is empty');

    const items = [];
    orderData.forEach(e => {
      items.push({
        id: e,
      });
    });
    const createOrderData: Order = await this.order.create({
      data: {
        items: {
          connect: items,
        },
      },
      include: {
        items: true,
      },
    });
    return createOrderData;
  }
  public async updateOrderStatus(
    orderId: number,
    orderStatus: string,
  ): Promise<Order> {
    if (isEmpty(orderStatus)) throw new HttpException(400, 'Status is empty');

    const findOrder: Order = await this.order.findUnique({
      where: { id: orderId },
    });
    if (!findOrder) throw new HttpException(409, "order doesn't exist");

    const updateOrderData = await this.order.update({
      where: { id: orderId },
      data: {
        status: orderStatus,
      },
      include: {
        items: true,
      },
    });
    return updateOrderData;
  }
}

export default OrderService;
