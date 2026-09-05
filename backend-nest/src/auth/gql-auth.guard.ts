import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { PermissionsService } from './permissions.service';
@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private jwt: JwtService, private permissions: PermissionsService) {}
  async canActivate(c: ExecutionContext) {
    const req = GqlExecutionContext.create(c).getContext().req; const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) throw new UnauthorizedException('Authentication required');
    try {
      const payload = await this.jwt.verifyAsync<{ sub: string }>(token);
      req.user = await this.permissions.getIdentity(payload.sub);
      return true;
    } catch {
      throw new UnauthorizedException('Session expired');
    }
  }
}
