import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RequireRoles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { DashboardService } from './dashboard.service';
import {
  AdminClientRecord,
  AdminProfessionalRecord,
  AdminReadinessRecord,
  DashboardData,
  SuperAdminDashboard,
} from './dashboard.types';

@Resolver()
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) {}

  @Query(() => DashboardData)
  @UseGuards(GqlAuthGuard)
  dashboard(@CurrentUser() user: any) {
    return this.dashboardService.get(user);
  }

  @Query(() => SuperAdminDashboard)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN')
  superAdminDashboard() {
    return this.dashboardService.superAdmin();
  }

  @Query(() => [AdminProfessionalRecord])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN')
  adminProfessionals() {
    return this.dashboardService.adminProfessionals();
  }

  @Query(() => [AdminClientRecord])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN')
  adminClients() {
    return this.dashboardService.adminClients();
  }

  @Query(() => [AdminReadinessRecord])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @RequireRoles('SUPER_ADMIN')
  adminReadiness() {
    return this.dashboardService.adminReadiness();
  }
}
