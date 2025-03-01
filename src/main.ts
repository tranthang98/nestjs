import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // forbidNonWhitelisted: true
  }));

  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  const configService = app.get(ConfigService);

  //config cookies
  app.use(cookieParser());

  //config cors
  app.enableCors(
    {
      "origin": true,
      "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
      "preflightContinue": false,
      credentials: true
    }
  );

  //config versioning
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1', '2']
  });

  //config helmet
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('NestJS Series APIs Document')
    .setDescription('All Modules APIs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app,
    config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    }
  });

  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
