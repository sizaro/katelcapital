import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { createHash, randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionsService } from './permissions.service';

type SessionMetadata = { ip?: string; userAgent?: string };

@Injectable()
export class AuthService {
  private readonly refreshLifetimeMs = 7 * 24 * 60 * 60 * 1000;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly permissions: PermissionsService,
  ) {}

  view(userId: string) {
    return this.permissions.getIdentity(userId);
  }

  async login(email: string, password: string, metadata: SessionMetadata) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email: normalizedEmail } });
    const passwordMatches = user ? await argon2.verify(user.passwordHash, password) : false;
    const accountIsActive = user?.status === 'ACTIVE';

    const failureReason = !passwordMatches
      ? 'INVALID_CREDENTIALS'
      : accountIsActive
        ? undefined
        : `ACCOUNT_${user?.status ?? 'UNKNOWN'}`;

    await this.prisma.loginHistory.create({
      data: {
        userId: user?.id,
        email: normalizedEmail,
        succeeded: Boolean(passwordMatches && accountIsActive),
        reason: failureReason,
        ipAddress: metadata.ip,
      },
    });

    // Do not reveal whether the email, password, or account status was responsible.
    if (!user || !passwordMatches || !accountIsActive) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const refreshToken = this.createRefreshToken();
    await this.prisma.$transaction([
      this.prisma.refreshSession.create({
        data: {
          userId: user.id,
          tokenHash: this.hash(refreshToken),
          ipAddress: metadata.ip,
          userAgent: metadata.userAgent,
          expiresAt: this.refreshExpiry(),
        },
      }),
      this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } }),
    ]);

    return {
      accessToken: await this.issueAccessToken(user.id),
      refreshToken,
      user: await this.view(user.id),
    };
  }

  async refresh(token: string | undefined, metadata: SessionMetadata) {
    if (!token) throw new UnauthorizedException('Refresh session missing');

    const session = await this.prisma.refreshSession.findUnique({
      where: { tokenHash: this.hash(token) },
      include: { user: true },
    });
    if (!session || session.revokedAt || session.expiresAt <= new Date()) {
      throw new UnauthorizedException('Refresh session expired');
    }
    if (session.user.status !== 'ACTIVE') {
      await this.prisma.refreshSession.updateMany({
        where: { userId: session.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      throw new UnauthorizedException('Refresh session expired');
    }

    const nextToken = this.createRefreshToken();
    await this.prisma.$transaction(async (tx) => {
      const revoked = await tx.refreshSession.updateMany({
        where: { id: session.id, revokedAt: null, expiresAt: { gt: new Date() } },
        data: { revokedAt: new Date() },
      });
      if (revoked.count !== 1) {
        throw new UnauthorizedException('Refresh session expired');
      }
      await tx.refreshSession.create({
        data: {
          userId: session.userId,
          tokenHash: this.hash(nextToken),
          ipAddress: metadata.ip ?? session.ipAddress,
          userAgent: metadata.userAgent ?? session.userAgent,
          expiresAt: this.refreshExpiry(),
        },
      });
    });

    return {
      accessToken: await this.issueAccessToken(session.userId),
      refreshToken: nextToken,
      user: await this.view(session.userId),
    };
  }

  async logout(token?: string) {
    if (token) {
      await this.prisma.refreshSession.updateMany({
        where: { tokenHash: this.hash(token), revokedAt: null },
        data: { revokedAt: new Date() },
      });
    }
    return true;
  }

  private issueAccessToken(userId: string) {
    return this.jwt.signAsync({ sub: userId });
  }

  private createRefreshToken() {
    return randomBytes(48).toString('base64url');
  }

  private refreshExpiry() {
    return new Date(Date.now() + this.refreshLifetimeMs);
  }

  private hash(value: string) {
    return createHash('sha256').update(value).digest('hex');
  }
}
