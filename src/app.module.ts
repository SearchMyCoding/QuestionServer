import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { QuestionModule } from './question/question.module';
import { ConfigModule } from '@nestjs/config';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeORMConfig),
    QuestionModule,
    AnswerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}