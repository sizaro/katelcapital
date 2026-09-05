import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { REQUIRED_PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(REQUIRED_PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required?.length) return true;

    const request = GqlExecutionContext.create(context).getContext().req;
    const granted = new Set<string>(request.user?.permissions ?? []);
    const missing = required.filter((permission) => !granted.has(permission));
    if (missing.length) {
      throw new ForbiddenException(`Missing required permission: ${missing.join(', ')}`);
    }
    return true;
  }
}
