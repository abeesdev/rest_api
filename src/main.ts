import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { CustomException } from './utils/httpException';
import { getMessageValidator } from './utils/validator';

import cookieParser from 'cookie-parser';
// somewhere in your initialization file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().addBearerAuth().setTitle('Rest_full_api').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(errors: ValidationError[]) {
        return new CustomException(HttpStatus.BAD_REQUEST, getMessageValidator(errors).join(','));
      },
    }),
  );

  app.enableCors({
    origin: ['http://localhost:3030'],
    // allowedHeaders: ['*'],
    credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
