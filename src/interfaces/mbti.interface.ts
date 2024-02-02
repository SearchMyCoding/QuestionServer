import { IBaseTestService } from "src/interfaces/test.interface";
import { ANSWER_TYPE, CHOICE_TYPE, MBTI_SINGLE_TEMPLATE_TYPE, MBTI_TYPE, QUESTION_AND_ANSWER_TYPE, QUESTION_SENDER_TYPE } from "src/constants/mbti";

export interface IMbtiTestService extends IBaseTestService{
  addQuestionAndAnswers<T extends MBTI_SINGLE_TEMPLATE_TYPE>(question: QUESTION_SENDER_TYPE, answers: [CHOICE_TYPE<T>, CHOICE_TYPE<T>]): void;
  generateRandomTest(numQuestion: number): QUESTION_AND_ANSWER_TYPE<MBTI_SINGLE_TEMPLATE_TYPE>[];
  calculateResult(choices: ANSWER_TYPE<MBTI_SINGLE_TEMPLATE_TYPE>[]): MBTI_TYPE;
}
