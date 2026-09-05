import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async get(user: { id: string; role: string }) {
    if (user.role === 'CLIENT') {
      const links = await this.prisma.organizationUser.findMany({
        where: { userId: user.id },
        select: { organizationId: true },
      });
      const organizationIds = links.map((link) => link.organizationId);
      const [requests, interviews, engagements, notifications] = await Promise.all([
        this.prisma.talentRequest.count({ where: { organizationId: { in: organizationIds } } }),
        this.prisma.interview.count({ where: { request: { organizationId: { in: organizationIds } } } }),
        this.prisma.engagement.count({ where: { organizationId: { in: organizationIds }, status: 'IN_PROGRESS' } }),
        this.prisma.notification.count({ where: { userId: user.id, readAt: null } }),
      ]);
      return {
        heading: 'Client workspace',
        description: 'Track your organization’s curated Katel activity.',
        metrics: this.metrics([
          ['requests', 'Hiring requests', requests],
          ['interviews', 'Interviews', interviews],
          ['engagements', 'Active engagements', engagements],
          ['notifications', 'Notifications', notifications],
        ]),
      };
    }

    if (user.role === 'PROFESSIONAL') {
      const profile = await this.prisma.professionalProfile.findUnique({
        where: { userId: user.id },
        include: { assessments: true, interviews: true, engagements: true },
      });
      return {
        heading: 'My Katel journey',
        description: 'Build your profile, readiness, and opportunities.',
        metrics: this.metrics([
          ['profile', 'Profile completion', profile?.completionPercent ?? 0],
          ['assessments', 'Assessments', profile?.assessments.length ?? 0],
          ['interviews', 'Interviews', profile?.interviews.length ?? 0],
          ['engagements', 'Engagements', profile?.engagements.length ?? 0],
        ]),
      };
    }

    if (user.role === 'ACADEMY_LEARNER') {
      const [enrollments, completions, notifications] = await Promise.all([
        this.prisma.academyEnrollment.count({ where: { userId: user.id } }),
        this.prisma.academyCompletion.count({ where: { userId: user.id } }),
        this.prisma.notification.count({ where: { userId: user.id, readAt: null } }),
      ]);
      return {
        heading: 'Katel Academy',
        description: 'Your learning relationship and permanent completion history.',
        metrics: this.metrics([
          ['enrollments', 'Enrollments', enrollments],
          ['completions', 'Completions', completions],
          ['notifications', 'Notifications', notifications],
        ]),
      };
    }

    const [users, learners, professionals, ready, organizations, requests, vetting, engagements] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.academyEnrollment.count(),
      this.prisma.professionalProfile.count(),
      this.prisma.professionalProfile.count({ where: { status: 'KATEL_READY' } }),
      this.prisma.clientOrganization.count(),
      this.prisma.talentRequest.count({ where: { status: { notIn: ['CLOSED', 'CANCELLED'] } } }),
      this.prisma.vettingCase.count({ where: { status: { in: ['OPEN', 'IN_PROGRESS'] } } }),
      this.prisma.engagement.count({ where: { status: 'IN_PROGRESS' } }),
    ]);
    return {
      heading: user.role === 'SUPER_ADMIN' ? 'Platform overview' : 'Katel staff workspace',
      description: 'Database-driven metrics across the Katel journey.',
      metrics: this.metrics([
        ['users', 'Users', users],
        ['learners', 'Academy learners', learners],
        ['professionals', 'Professionals', professionals],
        ['ready', 'KATEL READY', ready],
        ['organizations', 'Organizations', organizations],
        ['requests', 'Active requests', requests],
        ['vetting', 'Pending vetting', vetting],
        ['engagements', 'Active engagements', engagements],
      ]),
    };
  }

  async superAdmin() {
    const lastDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const now = new Date();
    const [
      totalUsers,
      activeUsers,
      pendingUsers,
      disabledUsers,
      roleRows,
      permissionCount,
      activeSessions,
      failedLogins,
      academyEnrollments,
      professionalProfiles,
      readyProfessionals,
      clientOrganizations,
      activeRequests,
      activeEngagements,
      recentUsers,
      auditEntries,
      loginEntries,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { status: 'ACTIVE' } }),
      this.prisma.user.count({ where: { status: 'PENDING' } }),
      this.prisma.user.count({ where: { status: 'DISABLED' } }),
      this.prisma.role.findMany({
        include: {
          users: { select: { status: true } },
          _count: { select: { permissions: true } },
        },
        orderBy: { displayName: 'asc' },
      }),
      this.prisma.permission.count(),
      this.prisma.refreshSession.count({ where: { revokedAt: null, expiresAt: { gt: now } } }),
      this.prisma.loginHistory.count({ where: { succeeded: false, createdAt: { gte: lastDay } } }),
      this.prisma.academyEnrollment.count(),
      this.prisma.professionalProfile.count(),
      this.prisma.professionalProfile.count({ where: { status: 'KATEL_READY' } }),
      this.prisma.clientOrganization.count(),
      this.prisma.talentRequest.count({ where: { status: { notIn: ['CLOSED', 'CANCELLED'] } } }),
      this.prisma.engagement.count({ where: { status: 'IN_PROGRESS' } }),
      this.prisma.user.findMany({
        include: { role: true },
        orderBy: { createdAt: 'desc' },
        take: 8,
      }),
      this.prisma.auditLog.findMany({
        include: { actor: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
      this.prisma.loginHistory.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),
    ]);

    const roles = roleRows.map((role) => ({
      role: role.name,
      displayName: role.displayName,
      users: role.users.length,
      activeUsers: role.users.filter((user) => user.status === 'ACTIVE').length,
      permissions: role._count.permissions,
    }));

    const activity = [
      ...auditEntries.map((entry) => ({
        id: entry.id,
        kind: 'AUDIT',
        title: this.humanize(entry.action),
        detail: `${entry.entityType}${entry.entityId ? ` · ${entry.entityId}` : ''}`,
        actor: entry.actor ? `${entry.actor.firstName} ${entry.actor.lastName}` : 'System',
        occurredAt: entry.createdAt.toISOString(),
        successful: true,
      })),
      ...loginEntries.map((entry) => ({
        id: entry.id,
        kind: 'LOGIN',
        title: entry.succeeded ? 'Sign in successful' : 'Sign in failed',
        detail: entry.reason ?? 'Authenticated session created',
        actor: entry.email,
        occurredAt: entry.createdAt.toISOString(),
        successful: entry.succeeded,
      })),
    ].sort((left, right) => right.occurredAt.localeCompare(left.occurredAt)).slice(0, 12);

    return {
      accountMetrics: this.metrics([
        ['users', 'Total users', totalUsers],
        ['active', 'Active accounts', activeUsers],
        ['pending', 'Pending accounts', pendingUsers],
        ['disabled', 'Disabled accounts', disabledUsers],
        ['roles', 'System roles', roleRows.length],
        ['permissions', 'Permissions', permissionCount],
        ['sessions', 'Active sessions', activeSessions],
        ['failedLogins', 'Failed logins · 24h', failedLogins],
      ]),
      systemMetrics: this.metrics([
        ['academy', 'Academy enrollments', academyEnrollments],
        ['professionals', 'Professional profiles', professionalProfiles],
        ['ready', 'KATEL READY', readyProfessionals],
        ['clients', 'Client organizations', clientOrganizations],
        ['requests', 'Active talent requests', activeRequests],
        ['engagements', 'Active engagements', activeEngagements],
      ]),
      roles,
      recentUsers: recentUsers.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role.displayName,
        status: user.status,
        createdAt: user.createdAt.toISOString(),
        lastLoginAt: user.lastLoginAt?.toISOString(),
      })),
      recentActivity: activity,
    };
  }

  private metrics(rows: Array<[string, string, number]>) {
    return rows.map(([key, label, value]) => ({ key, label, value }));
  }

  private humanize(value: string) {
    return value.toLowerCase().replaceAll('_', ' ').replace(/^./, (letter) => letter.toUpperCase());
  }
}
