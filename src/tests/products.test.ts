import request from 'supertest';
import App from '@/app';
import { CreateProductDto } from '@dtos/products.dto';
import ProductRoute from '@routes/products.route';
import randomWords from 'random-words';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

const mockData = {
  id: 1,
  title: randomWords({ exactly: 2, join: ' ' }),
  description: randomWords({ exactly: 5, join: ' ' }),
  currency: 'USD',
  price: (Math.random() * 1000).toFixed(2),
  quantity: parseInt(Math.ceil(Math.random() * 100).toString()),
  picture: 'https://picsum.photos/id/26/300/300',
};
describe('Testing Products', () => {
  it('should have a positive price', async () => {
    expect(parseInt(mockData.price)).toBeGreaterThan(0);
  });
  it('should have a product picture', async () => {});
});
