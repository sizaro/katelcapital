import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RequireRoles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { DashboardService } from './dashboard.service';
import { DashboardData, SuperAdminDashboard } from './dashboard.types';

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
}
