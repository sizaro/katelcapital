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
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
  }),
});

async function main() {
  const course = await prisma.academyCourse.findUnique({
    where: {
      code: 'DIGITAL-LITERACY-101',
    },
    include: {
      weeks: {
        orderBy: {
          order: 'asc',
        },
        include: {
          sessions: {
            orderBy: {
              order: 'asc',
            },
            include: {
              contentBlocks: {
                orderBy: {
                  order: 'asc',
                },
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    throw new Error('DIGITAL-LITERACY-101 was not found.');
  }

  console.log('\nCOURSE');
  console.log({
    id: course.id,
    code: course.code,
    title: course.title,
    isActive: course.isActive,
  });

  for (const week of course.weeks) {
    console.log('\nWEEK');
    console.log({
      id: week.id,
      title: week.title,
      status: week.status,
      isActive: week.isActive,
      order: week.order,
    });

    for (const session of week.sessions) {
      console.log('\nSESSION');
      console.log({
        id: session.id,
        title: session.title,
        status: session.status,
        isActive: session.isActive,
        order: session.order,
      });

      for (const block of session.contentBlocks) {
        console.log('\nCONTENT BLOCK');
        console.log({
          id: block.id,
          title: block.title,
          type: block.type,
          status: block.status,
          isActive: block.isActive,
          order: block.order,
        });
      }
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
