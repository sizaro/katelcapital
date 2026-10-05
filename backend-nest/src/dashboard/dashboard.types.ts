import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DashboardMetric {
  @Field() key!: string;
  @Field() label!: string;
  @Field(() => Int) value!: number;
}

@ObjectType()
export class DashboardData {
  @Field() heading!: string;
  @Field() description!: string;
  @Field(() => [DashboardMetric]) metrics!: DashboardMetric[];
}

@ObjectType()
export class AdminRoleSummary {
  @Field() role!: string;
  @Field() displayName!: string;
  @Field(() => Int) users!: number;
  @Field(() => Int) activeUsers!: number;
  @Field(() => Int) permissions!: number;
}

@ObjectType()
export class AdminUserSummary {
  @Field() id!: string;
  @Field() name!: string;
  @Field() email!: string;
  @Field() role!: string;
  @Field() status!: string;
  @Field() createdAt!: string;
  @Field({ nullable: true }) lastLoginAt?: string;
}

@ObjectType()
export class AdminActivity {
  @Field() id!: string;
  @Field() kind!: string;
  @Field() title!: string;
  @Field() detail!: string;
  @Field() actor!: string;
  @Field() occurredAt!: string;
  @Field() successful!: boolean;
}

@ObjectType()
export class SuperAdminDashboard {
  @Field(() => [DashboardMetric]) accountMetrics!: DashboardMetric[];
  @Field(() => [DashboardMetric]) systemMetrics!: DashboardMetric[];
  @Field(() => [AdminRoleSummary]) roles!: AdminRoleSummary[];
  @Field(() => [AdminUserSummary]) recentUsers!: AdminUserSummary[];
  @Field(() => [AdminActivity]) recentActivity!: AdminActivity[];
}

@ObjectType()
export class AdminProfessionalRecord {
  @Field() id!: string;
  @Field() code!: string;
  @Field() name!: string;
  @Field() email!: string;
  @Field() status!: string;
  @Field(() => Int) completionPercent!: number;
  @Field({ nullable: true }) category?: string;
  @Field({ nullable: true }) location?: string;
}

@ObjectType()
export class AdminClientRecord {
  @Field() id!: string;
  @Field() code!: string;
  @Field() name!: string;
  @Field({ nullable: true }) industry?: string;
  @Field({ nullable: true }) country?: string;
  @Field() status!: string;
  @Field(() => Int) contacts!: number;
  @Field(() => Int) requests!: number;
}

@ObjectType()
export class AdminReadinessRecord {
  @Field() id!: string;
  @Field() learnerName!: string;
  @Field() learnerEmail!: string;
  @Field() courseTitle!: string;
  @Field() enrollmentStatus!: string;
  @Field() status!: string;
  @Field({ nullable: true }) score?: string;
  @Field({ nullable: true }) reviewedBy?: string;
  @Field({ nullable: true }) reviewedAt?: string;
}
