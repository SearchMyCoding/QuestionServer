import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AnswerController } from 'src/answer/answer.controller';
import { AnswerService } from 'src/answer/answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question])],
  controllers: [AnswerController],
  providers: [AnswerService]
})
export class AnswerModule {}
