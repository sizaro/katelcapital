import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionsService } from '../auth/permissions.service';
import {
  AssignUserRoleInput,
  CreateRoleInput,
  RemovePermissionOverrideInput,
  SetPermissionOverrideInput,
  SetRolePermissionsInput,
} from './access.types';

@Injectable()
export class AccessService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly permissions: PermissionsService,
  ) {}

  async roles() {
    const roles = await this.prisma.role.findMany({
      include: {
        permissions: { include: { permission: true } },
        _count: { select: { users: true } },
      },
      orderBy: { displayName: 'asc' },
    });
    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      displayName: role.displayName,
      description: role.description,
      isSystem: role.isSystem,
      permissionKeys: role.permissions.map((item) => item.permission.key).sort(),
      userCount: role._count.users,
    }));
  }

  permissionsList() {
    return this.prisma.permission.findMany({ orderBy: { key: 'asc' } });
  }

  async users() {
    const users = await this.prisma.user.findMany({
      include: { role: true, overrides: { include: { permission: true } } },
      orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
    });
    return Promise.all(users.map(async (user) => {
      const identity = user.status === 'ACTIVE'
        ? await this.permissions.getIdentity(user.id)
        : { permissions: [] as string[] };
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
        roleId: user.roleId,
        role: user.role.name,
        effectivePermissions: identity.permissions,
        overrides: user.overrides.map((override) => ({
          permission: override.permission.key,
          effect: override.effect,
          reason: override.reason,
        })),
      };
    }));
  }

  async createRole(input: CreateRoleInput, actorId: string) {
    const permissionKeys = [...new Set(input.permissionKeys)];
    await this.assertPermissionKeys(permissionKeys);
    const role = await this.prisma.$transaction(async (tx) => {
      const created = await tx.role.create({
        data: {
          name: input.name,
          displayName: input.displayName,
          description: input.description,
          permissions: {
            create: permissionKeys.map((key) => ({
              permission: { connect: { key } },
            })),
          },
        },
      });
      await tx.auditLog.create({
        data: {
          actorId,
          action: 'ROLE_CREATED',
          entityType: 'Role',
          entityId: created.id,
          metadata: { name: created.name, permissionKeys },
        },
      });
      return created;
    });
    return (await this.roles()).find((item) => item.id === role.id)!;
  }

  async setRolePermissions(input: SetRolePermissionsInput, actorId: string) {
    const role = await this.prisma.role.findUnique({
      where: { id: input.roleId },
      include: { permissions: { include: { permission: true } } },
    });
    if (!role) throw new NotFoundException('Role not found');
    if (role.name === 'SUPER_ADMIN') {
      throw new BadRequestException('The Super Admin role permissions cannot be reduced');
    }
    const permissionKeys = [...new Set(input.permissionKeys)];
    await this.assertPermissionKeys(permissionKeys);
    const previous = role.permissions.map((item) => item.permission.key).sort();
    await this.prisma.$transaction(async (tx) => {
      await tx.rolePermission.deleteMany({ where: { roleId: role.id } });
      if (permissionKeys.length) {
        const permissions = await tx.permission.findMany({ where: { key: { in: permissionKeys } } });
        await tx.rolePermission.createMany({
          data: permissions.map((permission) => ({ roleId: role.id, permissionId: permission.id })),
        });
      }
      await tx.auditLog.create({
        data: {
          actorId,
          action: 'ROLE_PERMISSIONS_CHANGED',
          entityType: 'Role',
          entityId: role.id,
          metadata: { previous, next: permissionKeys.sort() },
        },
      });
    });
    return (await this.roles()).find((item) => item.id === role.id)!;
  }

  async assignUserRole(input: AssignUserRoleInput, actorId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: input.userId }, include: { role: true } });
    const role = await this.prisma.role.findUnique({ where: { id: input.roleId } });
    if (!user) throw new NotFoundException('User not found');
    if (!role) throw new NotFoundException('Role not found');
    if (user.role.name === 'SUPER_ADMIN') {
      throw new BadRequestException('The seeded Super Admin role cannot be reassigned');
    }
    await this.prisma.$transaction([
      this.prisma.user.update({ where: { id: user.id }, data: { roleId: role.id } }),
      this.prisma.auditLog.create({
        data: {
          actorId,
          action: 'USER_ROLE_CHANGED',
          entityType: 'User',
          entityId: user.id,
          metadata: { previousRole: user.role.name, nextRole: role.name },
        },
      }),
    ]);
    return this.userView(user.id);
  }

  async setOverride(input: SetPermissionOverrideInput, actorId: string) {
    await this.assertMutableUser(input.userId);
    const permission = await this.prisma.permission.findUnique({ where: { key: input.permissionKey } });
    if (!permission) throw new NotFoundException(`Unknown permission: ${input.permissionKey}`);
    await this.prisma.$transaction([
      this.prisma.userPermissionOverride.upsert({
        where: { userId_permissionId: { userId: input.userId, permissionId: permission.id } },
        update: { effect: input.effect as 'GRANT' | 'DENY', reason: input.reason },
        create: {
          userId: input.userId,
          permissionId: permission.id,
          effect: input.effect as 'GRANT' | 'DENY',
          reason: input.reason,
        },
      }),
      this.prisma.auditLog.create({
        data: {
          actorId,
          action: 'USER_PERMISSION_OVERRIDE_SET',
          entityType: 'User',
          entityId: input.userId,
          metadata: { permission: input.permissionKey, effect: input.effect, reason: input.reason },
        },
      }),
    ]);
    return this.userView(input.userId);
  }

  async removeOverride(input: RemovePermissionOverrideInput, actorId: string) {
    await this.assertMutableUser(input.userId);
    const permission = await this.prisma.permission.findUnique({ where: { key: input.permissionKey } });
    if (!permission) throw new NotFoundException(`Unknown permission: ${input.permissionKey}`);
    await this.prisma.$transaction([
      this.prisma.userPermissionOverride.deleteMany({
        where: { userId: input.userId, permissionId: permission.id },
      }),
      this.prisma.auditLog.create({
        data: {
          actorId,
          action: 'USER_PERMISSION_OVERRIDE_REMOVED',
          entityType: 'User',
          entityId: input.userId,
          metadata: { permission: input.permissionKey },
        },
      }),
    ]);
    return this.userView(input.userId);
  }

  private async userView(userId: string) {
    const users = await this.users();
    const user = users.find((item) => item.id === userId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  private async assertPermissionKeys(keys: string[]) {
    const count = await this.prisma.permission.count({ where: { key: { in: keys } } });
    if (count !== keys.length) throw new BadRequestException('One or more permission keys are invalid');
  }

  private async assertMutableUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { role: true } });
    if (!user) throw new NotFoundException('User not found');
    if (user.role.name === 'SUPER_ADMIN') {
      throw new BadRequestException('Direct overrides cannot be applied to the seeded Super Admin');
    }
  }
}
