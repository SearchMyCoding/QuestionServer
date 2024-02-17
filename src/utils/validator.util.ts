import { ATTENTION_FOCUS, JUDGMENT_FUNCTION, LIFESTYLE, PERCEPTION_FUNCTION, ANSWER_TYPE, MBTI_SINGLE_TEMPLATE_TYPE, QUESTION_TYPE } from "src/constants/mbti.constant";

export class qaValidator{
  public static convertAnswerTypeToQuestionType<T extends MBTI_SINGLE_TEMPLATE_TYPE>(answerType: ANSWER_TYPE<T>): QUESTION_TYPE{
    const answerTypeStr: string = typeof answerType;

    switch(answerType){
      case ATTENTION_FOCUS.EXTRAVERTED || ATTENTION_FOCUS.INTROVERTED:
        return "ATTENTION_FOCUS";
      case JUDGMENT_FUNCTION.FEELING || JUDGMENT_FUNCTION.THINKING:
        return "JUDGMENT_FUNCTION";
      case LIFESTYLE.JUDGING || LIFESTYLE.PERCEIVING:
        return "LIFESTYLE";
      case PERCEPTION_FUNCTION.INTUITION || PERCEPTION_FUNCTION.SENSING:
        return "PERCEPTION_FUNCTION";
    }

    return null;
  }

  private static validatePairAnswerTypes<T extends MBTI_SINGLE_TEMPLATE_TYPE>(sourceType: ANSWER_TYPE<T>, targetType: ANSWER_TYPE<T>): boolean{
    const sourceTypeStr: string = typeof sourceType;
    const targetTypeStr: string = typeof targetType;

    const sourceParentType: QUESTION_TYPE = qaValidator.convertAnswerTypeToQuestionType(sourceType);
    const targetParentType: QUESTION_TYPE = qaValidator.convertAnswerTypeToQuestionType(targetType);

    if(sourceParentType && targetParentType && sourceParentType === targetParentType){
      if(sourceTypeStr !== targetTypeStr){
        return true;
      }
    }
    return false;
  }

  public static validateQuestionAnswerPairType<T extends MBTI_SINGLE_TEMPLATE_TYPE>(questionType: QUESTION_TYPE, answerTypes: [ANSWER_TYPE<T>, ANSWER_TYPE<T>]): boolean{
    const [
      firstAnswerType,
      secondAnswerType
    ] = answerTypes;

    const parentType = qaValidator.convertAnswerTypeToQuestionType(firstAnswerType);
    const isPairAnswers = qaValidator.validatePairAnswerTypes(firstAnswerType, secondAnswerType);

    if(questionType === parentType && isPairAnswers){
      return true;
    }
    
    return false;
  }
}