import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformerInterceptor } from './common/interceptors/transformer.interceptor';
import { CustomExceptionsFilter } from './common/filters/custom-exception.filter';
import * as express from 'express';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new TransformerInterceptor());
  app.useGlobalFilters(new CustomExceptionsFilter());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));
  await app.listen(process.env.PORT!);
}
main().catch((err) => {
  console.error('Error during app startup', err);
  process.exit(1);
});
