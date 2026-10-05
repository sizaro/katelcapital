import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';

import { AcademyResolver } from './academy.resolver';
import { AcademyService } from './academy.service';
import { AcademyJsonScalar } from './academy.types';

@Module({
  imports: [AuthModule],
  providers: [AcademyResolver, AcademyService, AcademyJsonScalar],
  exports: [AcademyService],
})
export class AcademyModule {}
