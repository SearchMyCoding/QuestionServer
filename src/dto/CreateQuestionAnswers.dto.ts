import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { MBTI_SINGLE_TEMPLATE_TYPE, QUESTION_TYPE } from 'src/constants/mbti';

export class CreateQuestionAnswersDto{
  @ApiProperty({
    description : "질문 유형",
    required: true,
    nullable: false,
    example: 'ATTENTION_FOCUS'
  })
  @IsString()
  readonly questionType: QUESTION_TYPE;

  @ApiProperty({
    description : "질문 내용",
    required: true,
    nullable: false,
    uniqueItems: true,
    maxLength: 512
  })
  @IsString()
  readonly questionContents: string;

  @ApiProperty({
    default : true,
    description : "활성화 여부",
    required: false,
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  readonly isActivate?: boolean;

  @ApiProperty({
      description: "대답 유형",
      required: true,
      nullable: false
  })
  @IsString()
  readonly firstAnswerType: MBTI_SINGLE_TEMPLATE_TYPE;

  @ApiProperty({
      description: "대답",
      required: true,
      nullable: false,
      uniqueItems: true
  })
  @IsString()
  readonly firstAnswerContents: string;

  @ApiProperty({
    description: "대답 유형",
    required: true,
    nullable: false
})
@IsString()
readonly secondAnswerType: MBTI_SINGLE_TEMPLATE_TYPE;

@ApiProperty({
    description: "대답",
    required: true,
    nullable: false,
    uniqueItems: true
})
@IsString()
readonly secondAnswerContents: string;
}