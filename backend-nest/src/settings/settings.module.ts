import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SettingsResolver } from './settings.resolver';
import { SettingsService } from './settings.service';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [SettingsResolver, SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
