import request from 'supertest';
import App from '@/app'; 
import { CreateOrderDto } from '@dtos/orders.dto';

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
  it('should have a correct starting status', async () => {
    expect(mockData.status).toEqual('PAYMENT_PENDING');
  });
  it('should have more than 1 items', async () => {
    expect(mockData.items.length).toBeGreaterThan(0);
  });
});
