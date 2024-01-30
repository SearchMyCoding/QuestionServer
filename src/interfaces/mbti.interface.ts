import { IBaseTestService } from "src/constants/test";
import { ANSWER_TYPE, CHOICE_TYPE, MBTI_SINGLE_TEMPLATE_TYPE, MBTI_TYPE, QUESTION_AND_ANSWER_TYPE, QUESTION_SENDER_TYPE, QUESTION_TYPE } from "src/constants/type";

export interface IMbtiTestService extends IBaseTestService{
  addQuestionAndAnswers(question: QUESTION_SENDER_TYPE, answers: CHOICE_TYPE<MBTI_SINGLE_TEMPLATE_TYPE>[]): void;
  generateRandomTest(numQuestion: number): QUESTION_AND_ANSWER_TYPE<MBTI_SINGLE_TEMPLATE_TYPE>[];
  calculateResult(choices: ANSWER_TYPE<MBTI_SINGLE_TEMPLATE_TYPE>[]): MBTI_TYPE;
}
