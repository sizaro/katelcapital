import { existsSync } from 'node:fs';

if (existsSync('.env')) process.loadEnvFile('.env');

import * as argon2 from 'argon2';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : undefined,
  }),
});

const permissionKeys = [
  'users.view',
  'users.manage',
  'roles.view',
  'roles.manage',
  'professionals.view',
  'professionals.edit',
  'professionals.assess',
  'professionals.vet',
  'professionals.approve_ready',
  'academy.view',
  'academy.manage',
  'academy.grade',
  'academy.learn',
  'academy.byu.review',
  'academy.fees.manage',
  'clients.view',
  'clients.manage',
  'talent_requests.view',
  'talent_requests.manage',
  'matching.view',
  'matching.manage',
  'interviews.view',
  'interviews.manage',
  'engagements.view',
  'engagements.manage',
  'reports.view',
  'reports.export',
  'finance.view',
  'documents.view_sensitive',
  'documents.download_sensitive',
  'settings.manage',
  'audit.view',
];

const rolePermissions: Record<string, string[]> = {
  SUPER_ADMIN: permissionKeys,

  ADMIN: permissionKeys.filter(
    (key) => !['roles.manage', 'settings.manage'].includes(key),
  ),

  TALENT_SUCCESS_MANAGER: [
    'professionals.view',
    'clients.view',
    'clients.manage',
    'talent_requests.view',
    'talent_requests.manage',
    'matching.view',
    'interviews.view',
    'interviews.manage',
    'engagements.view',
    'engagements.manage',
  ],

  VETTING_OFFICER: [
    'professionals.view',
    'professionals.assess',
    'professionals.vet',
    'academy.view',
    'academy.byu.review',
  ],

  ACADEMY_MANAGER: [
    'academy.view',
    'academy.manage',
    'academy.grade',
    'academy.byu.review',
    'professionals.view',
  ],

  PROFESSIONAL: [],

  CLIENT: [],

  ACADEMY_LEARNER: ['academy.learn'],
};

async function seedUser(
  email: string,
  roleName: string,
  firstName: string,
  password: string,
) {
  const role = await prisma.role.findUniqueOrThrow({
    where: { name: roleName },
  });

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash: await argon2.hash(password),
      firstName,
      lastName: 'User',
      status: 'ACTIVE',
      emailVerifiedAt: new Date(),
      roleId: role.id,
    },
  });
}

async function main() {
  const existingAdmin = await prisma.user.findFirst({
    where: {
      role: {
        name: 'SUPER_ADMIN',
      },
    },
  });

  const adminEmail = process.env.SEED_SUPER_ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.SEED_SUPER_ADMIN_PASSWORD;

  if (!existingAdmin) {
    if (
      !adminEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail) ||
      !adminPassword ||
      adminPassword.length < 12
    ) {
      throw new Error(
        'Set valid Super Admin seed credentials; password must be at least 12 characters',
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: adminEmail,
      },
    });

    if (existingUser) {
      throw new Error(
        'Super Admin seed email belongs to an existing account; refusing to change its role',
      );
    }
  }

  for (const key of permissionKeys) {
    await prisma.permission.upsert({
      where: {
        key,
      },
      update: {},
      create: {
        key,
      },
    });
  }

  for (const [name, keys] of Object.entries(rolePermissions)) {
    const role = await prisma.role.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
        displayName: name
          .split('_')
          .map((part) => part[0] + part.slice(1).toLowerCase())
          .join(' '),
        isSystem: true,
      },
    });

    for (const key of keys) {
      const permission = await prisma.permission.findUniqueOrThrow({
        where: {
          key,
        },
      });

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: permission.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: permission.id,
        },
      });
    }
  }

  if (!existingAdmin) {
    await seedUser(adminEmail!, 'SUPER_ADMIN', 'Super Admin', adminPassword!);
  }

  // Production may opt in to the two Academy reviewers without creating the
  // broader local demo account set. They are idempotent and can be omitted.
  for (const account of [
    { email: process.env.SEED_ACADEMY_MANAGER_EMAIL, password: process.env.SEED_ACADEMY_MANAGER_PASSWORD, role: 'ACADEMY_MANAGER', name: 'Academy Manager' },
    { email: process.env.SEED_VETTING_OFFICER_EMAIL, password: process.env.SEED_VETTING_OFFICER_PASSWORD, role: 'VETTING_OFFICER', name: 'Vetting Officer' },
  ]) {
    if (!account.email && !account.password) continue;
    if (!account.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email) || !account.password || account.password.length < 12) {
      throw new Error(`Set a valid email and a password of at least 12 characters for ${account.role}, or remove both optional seed values.`);
    }
    await seedUser(account.email.trim().toLowerCase(), account.role, account.name, account.password);
  }

  const demoPassword = process.env.SEED_DEMO_PASSWORD;

  if (
    process.env.NODE_ENV !== 'production' &&
    demoPassword &&
    demoPassword.length >= 12
  ) {
    for (const [email, role, name] of [
      ['administrator@katel.local', 'ADMIN', 'Administrator'],
      [
        'talent-success@katel.local',
        'TALENT_SUCCESS_MANAGER',
        'Talent Success',
      ],
      ['vetting@katel.local', 'VETTING_OFFICER', 'Vetting Officer'],
      ['academy-manager@katel.local', 'ACADEMY_MANAGER', 'Academy Manager'],
      ['professional@katel.local', 'PROFESSIONAL', 'Professional'],
      ['client@katel.local', 'CLIENT', 'Client'],
      ['learner@katel.local', 'ACADEMY_LEARNER', 'Academy Learner'],
    ]) {
      await seedUser(email, role, name, demoPassword);
    }
  }

  for (const name of [
    'Administration',
    'Customer Support',
    'Finance',
    'Human Resources',
    'Information Technology',
  ]) {
    await prisma.professionalCategory.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  for (const name of [
    'Communication',
    'Professional Writing',
    'Digital Literacy',
    'Problem Solving',
    'Teamwork',
    'Time Management',
  ]) {
    await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  await prisma.systemSetting.upsert({
    where: {
      key: 'platform',
    },
    update: {},
    create: {
      key: 'platform',
      value: {
        name: 'Katel Capital',
        timezone: 'Africa/Kampala',
        currency: 'UGX',
      },
    },
  });

  for (const [key, value, description] of [
    ['academy.registration_fee.first_time', 50000, 'Academy first-time registration fee in UGX.'],
    ['academy.registration_fee.re_enrollment', 20000, 'Academy re-enrollment fee after a failed course in UGX.'],
    ['academy.registration_fee.byu_pathway', 30000, 'Academy registration fee for approved BYU Pathway applicants in UGX.'],
  ] as const) {
    await prisma.systemSetting.upsert({
      where: { key },
      update: {},
      create: { key, value, description },
    });
  }
}

main()
  .catch((error) => {
    console.error('Initial seed failed:', error.message);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
