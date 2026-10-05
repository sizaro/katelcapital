import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString,
  }),
});

async function main() {
  console.log('Users:', await prisma.user.count());
  console.log('Roles:', await prisma.role.count());
  console.log('Permissions:', await prisma.permission.count());
  console.log('Courses:', await prisma.academyCourse.count());

  console.log('\nDemo users:');

  const users = await prisma.user.findMany({
    where: {
      email: {
        endsWith: '@katel.local',
      },
    },
    select: {
      email: true,
      firstName: true,
      role: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      email: 'asc',
    },
  });

  console.table(users);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
