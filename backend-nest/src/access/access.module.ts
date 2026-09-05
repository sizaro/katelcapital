import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AccessResolver } from './access.resolver';
import { AccessService } from './access.service';

@Module({ imports: [AuthModule], providers: [AccessResolver, AccessService] })
export class AccessModule {}
