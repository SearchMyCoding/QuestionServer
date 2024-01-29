import { MBTI_OBJ_TYPE, MBTI_TYPE, QUESTION_AND_ANSWER_TYPE } from "src/constants/type";

export interface IMbtiService {
  generateTest(numTests: number): QUESTION_AND_ANSWER_TYPE[];
  calculateTest(mbtiObj: MBTI_OBJ_TYPE): MBTI_TYPE;
}
