import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SettingsModule } from '../settings/settings.module';
import { StorageModule } from '../storage/storage.module';
import { AcademyLifecycleResolver } from './academy-lifecycle.resolver';
import { AcademyLifecycleService } from './academy-lifecycle.service';

@Module({
  imports: [AuthModule, PrismaModule, SettingsModule, StorageModule],
  providers: [AcademyLifecycleService, AcademyLifecycleResolver],
  exports: [AcademyLifecycleService],
})
export class AcademyLifecycleModule {}
