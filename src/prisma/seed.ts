import { PrismaClient } from '@prisma/client';
import randomWords from 'random-words';

const prisma = new PrismaClient();
async function main() {
  await seedUsers();
  await seedProducts();
  await seedOrders();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
async function seedUsers() {
  const user = await prisma.user.upsert({
    where: { email: 'rowantyj@gmail.com' },
    update: {},
    create: {
      email: 'rowantyj@gmail.com',
      password: 'password123',
    },
  });
  console.log({ user });
}
async function seedProducts() {
  const products = await prisma.product.createMany({
    data: generateProducts(),
  });
  console.log({ products });
}
function generateProducts() {
  const records = [];
  for (let i = 0, len = 30; i < len; i++) {
    records.push({
      title: randomWords({ exactly: 2, join: ' ' }),
      description: randomWords({ exactly: 5, join: ' ' }),
      currency: 'USD',
      price: (Math.random() * 1000).toFixed(2),
      quantity: parseInt(Math.ceil(Math.random() * 100).toString()),
      picture: 'https://picsum.photos/id/26/300/300',
    });
  }

  return records;
}
async function seedOrders() {
  const products = await prisma.product.findMany();
  const orders = await prisma.order.create({
    data: {
      items: {
        connect: generateOrders(products),
      },
    },
    include: {
      items: true,
    },
  });
  console.log({ orders });
}
function generateOrders(products) {
  /* Randomly add 5 items from the products list */
  const orderItems = [];
  for (let i = 0, len = 5; i < len; i++) {
    const orderItem = {
      id: products[Math.floor(Math.random() * products.length)].id,
    };
    orderItems.push(orderItem);
  }
  console.log({ orderItems });
  return orderItems;
}
