import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AcademyResolver } from './academy.resolver';
import { AcademyService } from './academy.service';

@Module({
  imports: [AuthModule],
  providers: [AcademyResolver, AcademyService],
  exports: [AcademyService],
})
export class AcademyModule {}
