import { existsSync } from 'node:fs';

if (existsSync('.env')) {
  process.loadEnvFile('.env');
}

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
  }),
});

async function main() {
  const users = await prisma.user.findMany({
    include: {
      role: true,
    },
    orderBy: {
      email: 'asc',
    },
  });

  console.table(
    users.map((user) => ({
      email: user.email,
      role: user.role.name,
      status: user.status,
    })),
  );
}

main()
  .catch((error) => {
    console.error('Inspection failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
