import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user.decorator';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { AcademyService } from './academy.service';
import {
  AcademyCourse,
  CreateAcademyCourseInput,
  UpdateAcademyCourseInput,
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
}
