import { Injectable } from '@nestjs/common';
import { QuestionService } from 'src/question/question.service';
import { AnswerService } from 'src/answer/answer.service';
import { UUID } from 'crypto';
import { Question } from 'src/question/question.entity';
import { Answer } from 'src/answer/answer.entity';

@Injectable()
export class AppService {
  constructor(private readonly questionService: QuestionService, private readonly answerService: AnswerService) {}

  async getQuestionIdList() {
    return await this.questionService.read({
      select: {
        id: true,
      },
    });
  }

  async getTestSet(questionId: UUID) {
    const [question]: Question[] = await this.questionService.read({
      where: {
        id: questionId,
      },
    });

    const answers: Answer[] = await this.answerService.read({
      where: {
        question: {
          id: questionId,
        },
      },
    });

    const questionResponseDto = {
      question,
      answer: answers,
    };

    return questionResponseDto;
  }
}
