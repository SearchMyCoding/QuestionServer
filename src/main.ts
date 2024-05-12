import { validationConfig } from 'src/config/validation.config'
import { SwaggerConfig } from 'src/config/swagger.config'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from 'src/app.module'
import { LoggerInterceptor } from 'src/logger/logger.interceptor'

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule)
  const config: ConfigService = app.get<ConfigService>(ConfigService)

  const swaggerPath: string = config.get<string>('SWAGGER_PATH')
  const port: string = config.get<string>('SERVER_PORT')
  const document: OpenAPIObject = SwaggerModule.createDocument(app, SwaggerConfig)

  app.useGlobalPipes(new ValidationPipe(validationConfig))
  app.useGlobalInterceptors(new LoggerInterceptor())

  SwaggerModule.setup(swaggerPath, app, document)

  await app.listen(port)
}

bootstrap()
