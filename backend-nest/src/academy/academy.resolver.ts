import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { AcademyService } from './academy.service';
import {
  AcademyContentBlock,
  AcademyCourse,
  AcademySession,
  AcademyWeek,
  CreateAcademyContentBlockInput,
  CreateAcademyCourseInput,
  CreateAcademySessionInput,
  CreateAcademyWeekInput,
  UpdateAcademyContentBlockInput,
  UpdateAcademyCourseInput,
  UpdateAcademySessionInput,
  UpdateAcademyWeekInput,
} from './academy.types';

@Resolver(() => AcademyCourse)
export class AcademyResolver {
  constructor(private readonly academy: AcademyService) {}

  @Query(() => [AcademyCourse])
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.view')
  academyCourses(@CurrentUser() _user: any) {
    return this.academy.listActiveCourses();
  }

  @Query(() => AcademyCourse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.view')
  academyCourse(@Args('id', { type: () => ID }) id: string) {
    return this.academy.getActiveCourse(id);
  }

  @Mutation(() => AcademyCourse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.manage')
  createAcademyCourse(@Args('input') input: CreateAcademyCourseInput) {
    return this.academy.createCourse(input);
  }

  @Mutation(() => AcademyCourse)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.manage')
  updateAcademyCourse(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateAcademyCourseInput,
  ) {
    return this.academy.updateCourse(id, input);
  }

  @Mutation(() => AcademyWeek)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.manage')
  createAcademyWeek(
    @Args('courseId', { type: () => ID }) courseId: string,
    @Args('input') input: CreateAcademyWeekInput,
  ) {
    return this.academy.createWeek(courseId, input);
  }

  @Mutation(() => AcademyWeek)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.manage')
  updateAcademyWeek(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateAcademyWeekInput,
  ) {
    return this.academy.updateWeek(id, input);
  }

  @Mutation(() => AcademySession)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.manage')
  createAcademySession(
    @Args('weekId', { type: () => ID }) weekId: string,
    @Args('input') input: CreateAcademySessionInput,
  ) {
    return this.academy.createSession(weekId, input);
  }

  @Mutation(() => AcademySession)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.manage')
  updateAcademySession(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateAcademySessionInput,
  ) {
    return this.academy.updateSession(id, input);
  }

  @Mutation(() => AcademyContentBlock)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.manage')
  createAcademyContentBlock(
    @Args('sessionId', { type: () => ID }) sessionId: string,
    @Args('input') input: CreateAcademyContentBlockInput,
  ) {
    return this.academy.createContentBlock(sessionId, input);
  }

  @Mutation(() => AcademyContentBlock)
  @UseGuards(GqlAuthGuard, PermissionsGuard)
  @RequirePermissions('academy.manage')
  updateAcademyContentBlock(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateAcademyContentBlockInput,
  ) {
    return this.academy.updateContentBlock(id, input);
  }
}
