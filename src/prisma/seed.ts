import { PrismaClient } from '@prisma/client';
import randomWords from 'random-words';

const prisma = new PrismaClient();
async function main() {
  await seedUsers();
  await seedProducts();
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
  const rowan = await prisma.user.upsert({
    where: { email: 'rowantyj@gmail.com' },
    update: {},
    create: {
      email: 'rowantyj@gmail.com',
      password: 'password123',
    },
  });
  console.log({ rowan });
}
async function seedProducts() {
  const products = await prisma.product.createMany({
    data: generateRecords(),
  });
  console.log({ products });
}
function generateRecords() {
  const records = [];
  for (let i = 0, len = 30; i < len; i++) {
    records.push({
      title: randomWords({ exactly: 3, join: ' ' }),
      currency: 'USD',
      price: (Math.random() * 1000).toFixed(2),
      quantity: parseInt(Math.ceil(Math.random() * 100).toString()),
      picture: 'https://picsum.photos/id/26/300/300',
    });
  }

  return records;
}
