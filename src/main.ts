import { validationConfig } from 'src/config/validation.config';
import { SwaggerConfig } from 'src/config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe(validationConfig));
  
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup(configService.get('SWAGGER_PATH'), app, document);

  await app.listen(configService.get('SERVER_PORT'));
}
bootstrap();
