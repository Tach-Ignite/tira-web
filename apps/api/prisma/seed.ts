/* eslint-disable no-console */
// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

import generateSeedData from './seeder/generateSeedData';
// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await generateSeedData();
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
