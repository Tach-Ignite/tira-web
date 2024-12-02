import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  ValidationPipe,
  HttpStatus,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@common/logger/logger.service';

dotenv.config({
  path: [path.resolve('../../.env.secrets.local')],
});

dotenv.config({
  path: [path.resolve('../../.env.local')],
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
    bodyParser: false,
  });
  const globalPrefix = 'api';

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // Automatically transform payloads into DTO instances
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY, // Returns 422 for validation errors
      disableErrorMessages: false,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('TIRA-API')
    .setDescription('Tach Ignite Reference Architecture API Documentation')
    .setVersion('0.1')
    .addServer(globalPrefix)
    .addCookieAuth('Authentication', {
      in: 'cookie',
      type: 'apiKey',
      scheme: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config, {});

  SwaggerModule.setup('swagger', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
      req.rawBody = buf.toString(encoding || 'utf8');
    }
  };
  app.use(bodyParser.json({ verify: rawBodyBuffer, limit: '50mb' }));

  app.use(
    bodyParser.urlencoded({
      verify: rawBodyBuffer,
      limit: '50mb',
      extended: true,
    }),
  );
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  app.setGlobalPrefix(globalPrefix);
  await app.listen(app.get(ConfigService).getOrThrow('NEST_PORT'));
}
bootstrap();
