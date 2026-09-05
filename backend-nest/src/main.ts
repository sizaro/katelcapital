import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: ['graphql'] });
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const origins = (process.env.FRONTEND_ORIGINS || 'http://localhost:5173').split(',').map((v) => v.trim());
  app.enableCors({ origin: origins, credentials: true });
  const docs = SwaggerModule.createDocument(app, new DocumentBuilder().setTitle('Katel Capital API').setVersion('1.0').build());
  SwaggerModule.setup('api/docs', app, docs);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
