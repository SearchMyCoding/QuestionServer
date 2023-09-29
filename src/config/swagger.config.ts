import { DocumentBuilder } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
    .setTitle('MBTI API')
    .setDescription('MBTI API description')
    .setVersion('0.0.1')
    .build();