import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformerInterceptor } from './common/interceptors/transformer.interceptor';
import { CustomExceptionsFilter } from './common/filters/custom-exception.filter';
async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformerInterceptor());
  app.useGlobalFilters(new CustomExceptionsFilter());
  await app.listen(process.env.PORT!);
}
main().catch((err) => {
  console.error('Error during app startup', err);
  process.exit(1);
});
