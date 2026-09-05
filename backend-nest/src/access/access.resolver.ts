import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AccessService } from './access.service';
import {
  AccessPermission,
  AccessRole,
  AccessUser,
  AssignUserRoleInput,
  CreateRoleInput,
  RemovePermissionOverrideInput,
  SetPermissionOverrideInput,
  SetRolePermissionsInput,
} from './access.types';

@Resolver()
@UseGuards(GqlAuthGuard, PermissionsGuard)
export class AccessResolver {
  constructor(private readonly access: AccessService) {}

  @Query(() => [AccessRole])
  @RequirePermissions('roles.view')
  accessRoles() { return this.access.roles(); }

  @Query(() => [AccessPermission])
  @RequirePermissions('roles.view')
  accessPermissions() { return this.access.permissionsList(); }

  @Query(() => [AccessUser])
  @RequirePermissions('users.view')
  accessUsers() { return this.access.users(); }

  @Mutation(() => AccessRole)
  @RequirePermissions('roles.manage')
  createAccessRole(@Args('input') input: CreateRoleInput, @CurrentUser() actor: any) {
    return this.access.createRole(input, actor.id);
  }

  @Mutation(() => AccessRole)
  @RequirePermissions('roles.manage')
  setRolePermissions(@Args('input') input: SetRolePermissionsInput, @CurrentUser() actor: any) {
    return this.access.setRolePermissions(input, actor.id);
  }

  @Mutation(() => AccessUser)
  @RequirePermissions('users.manage')
  assignUserRole(@Args('input') input: AssignUserRoleInput, @CurrentUser() actor: any) {
    return this.access.assignUserRole(input, actor.id);
  }

  @Mutation(() => AccessUser)
  @RequirePermissions('users.manage')
  setUserPermissionOverride(@Args('input') input: SetPermissionOverrideInput, @CurrentUser() actor: any) {
    return this.access.setOverride(input, actor.id);
  }

  @Mutation(() => AccessUser)
  @RequirePermissions('users.manage')
  removeUserPermissionOverride(@Args('input') input: RemovePermissionOverrideInput, @CurrentUser() actor: any) {
    return this.access.removeOverride(input, actor.id);
  }
}
