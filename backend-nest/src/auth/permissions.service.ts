import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export type AuthIdentity = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions: string[];
};

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getIdentity(userId: string): Promise<AuthIdentity> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: { include: { permissions: { include: { permission: true } } } },
        overrides: { include: { permission: true } },
      },
    });

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('Account is not active');
    }

    const permissions = new Set(
      user.role.permissions.map((assignment) => assignment.permission.key),
    );
    for (const override of user.overrides) {
      if (override.effect === 'GRANT') permissions.add(override.permission.key);
      else permissions.delete(override.permission.key);
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.name,
      permissions: [...permissions].sort(),
    };
  }
}
