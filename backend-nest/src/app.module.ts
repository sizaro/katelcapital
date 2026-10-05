import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AccessModule } from './access/access.module';
import { AcademyModule } from './academy/academy.module';
import { SettingsModule } from './settings/settings.module';
import { AcademyLifecycleModule } from './academy-lifecycle/academy-lifecycle.module';
import { EmailModule } from './email/email.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      path: '/graphql',
      context: ({ req, res }) => ({ req, res }),
      formatError: (error) => ({
        message: error.message,
        path: error.path,
        extensions: {
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
        },
      }),
    }),
    PrismaModule,
    AuthModule,
    DashboardModule,
    AccessModule,
    AcademyModule,
    SettingsModule,
    EmailModule,
    StorageModule,
    AcademyLifecycleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
