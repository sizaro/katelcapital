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
  const learner = await prisma.user.findUnique({
    where: {
      email: 'learner@katel.local',
    },
  });

  if (!learner) {
    throw new Error('learner@katel.local was not found.');
  }

  const course = await prisma.academyCourse.findUnique({
    where: {
      code: 'DIGITAL-LITERACY-101',
    },
  });

  if (!course) {
    throw new Error('DIGITAL-LITERACY-101 was not found.');
  }

  if (course.durationWeeks < 1) {
    throw new Error(
      `Course ${course.code} has an invalid duration: ${course.durationWeeks} weeks.`,
    );
  }

  /*
   * A registration represents the learner's registration/application
   * for a course.
   *
   * Registrations are no longer unique by userId + courseId because
   * the learner may register again after a failed or expired course run.
   */
  const existingRegistration = await prisma.academyRegistration.findFirst({
    where: {
      userId: learner.id,
      courseId: course.id,
      status: 'APPROVED',
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const registration =
    existingRegistration ??
    (await prisma.academyRegistration.create({
      data: {
        userId: learner.id,
        courseId: course.id,
        status: 'APPROVED',
        feeCategory: 'FIRST_TIME',
        feeAmount: 50000,
        currency: 'UGX',
        verifiedAt: new Date(),
      },
    }));

  if (existingRegistration) {
    await prisma.academyRegistration.update({
      where: {
        id: registration.id,
      },
      data: {
        status: 'APPROVED',
        verifiedAt: new Date(),
      },
    });
  }

  /*
   * Only an active enrollment should be reused.
   *
   * FAILED and EXPIRED enrollments are historical course runs and
   * must remain in the database.
   */
  const existingEnrollment = await prisma.academyEnrollment.findFirst({
    where: {
      userId: learner.id,
      courseId: course.id,
      status: {
        in: ['ENROLLED', 'IN_PROGRESS'],
      },
    },
    orderBy: {
      enrolledAt: 'desc',
    },
  });

  const enrolledAt = existingEnrollment?.enrolledAt ?? new Date();

  const expiresAt = new Date(enrolledAt);
  expiresAt.setDate(expiresAt.getDate() + course.durationWeeks * 7);

  const enrollment =
    existingEnrollment ??
    (await prisma.academyEnrollment.create({
      data: {
        userId: learner.id,
        courseId: course.id,
        registrationId: registration.id,
        status: 'ENROLLED',
        enrolledAt,
        expiresAt,
      },
    }));

  if (existingEnrollment) {
    await prisma.academyEnrollment.update({
      where: {
        id: enrollment.id,
      },
      data: {
        registrationId: registration.id,
        status: 'ENROLLED',
        enrolledAt,
        expiresAt,
      },
    });
  }

  console.log('Academy test enrollment created/updated:');
  console.log({
    learner: learner.email,
    course: course.code,
    durationWeeks: course.durationWeeks,
    registrationId: registration.id,
    enrollmentId: enrollment.id,
    enrolledAt: enrollment.enrolledAt,
    expiresAt: enrollment.expiresAt,
    enrollmentStatus: enrollment.status,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
