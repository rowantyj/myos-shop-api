import request from 'supertest';
import { PrismaClient, Order } from '@prisma/client';
import App from '@/app';
import { CreateOrderDto } from '@dtos/orders.dto';
import OrderRoute from '@routes/orders.route';
import randomWords from 'random-words';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

const mockData = {
  id: '10',
  uuid: '5eccb025-d0c8-415d-979c-06e4e5f7c55f',
  status: 'PAYMENT_PENDING',
  created_at: '1670661926009',
  updated_at: '1670661926009',
  items: [
    {
      id: '615',
      uuid: 'f1ddac76-0261-4a53-baa2-036066f607bb',
      title: 'friendly harbor',
      description: 'original pink born nuts am',
      currency: 'USD',
      price: '507.59',
      quantity: 95,
    },
  ],
};
describe('Testing Orders', () => {
  describe('[GET] /orders', () => {
    it('response findAll orders', async () => {
      const ordersRoute = new OrderRoute();
      const orders = ordersRoute.ordersController.orderService.orders;

      orders.findMany = jest.fn().mockReturnValue([mockData]);

      const app = new App([ordersRoute]);
      return request(app.getServer()).get(`${ordersRoute.path}`).expect(200);
    });
  });

  describe('[GET] /orders/:id', () => {
    it('response findOne order', async () => {
      const orderId = 10;
      const ordersRoute = new OrderRoute();
      const orders = ordersRoute.ordersController.orderService.orders;

      orders.findUnique = jest.fn().mockReturnValue(mockData);

      const app = new App([ordersRoute]);
      return request(app.getServer())
        .get(`${ordersRoute.path}/${orderId}`)
        .expect(200);
    });
  });
});
