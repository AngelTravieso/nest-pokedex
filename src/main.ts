import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global
  app.setGlobalPrefix(
    'api/v2',
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // transformar información que fluye por DTOs (OPCIONAL)
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  )

  await app.listen(3000);
}
bootstrap();
