import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RequirePermissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { SettingsService } from './settings.service';
import {
  AcademyFeeSettings,
  UpdateAcademyFeeSettingsInput,
} from './settings.types';

@Resolver()
@UseGuards(GqlAuthGuard, PermissionsGuard)
@RequirePermissions('academy.fees.manage')
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  @Query(() => AcademyFeeSettings)
  academyFeeSettings() {
    return this.settingsService.getAcademyFeeSettings();
  }

  @Mutation(() => AcademyFeeSettings)
  updateAcademyFeeSettings(
    @Args('input') input: UpdateAcademyFeeSettingsInput,
  ) {
    return this.settingsService.updateAcademyFeeSettings(input);
  }
}
