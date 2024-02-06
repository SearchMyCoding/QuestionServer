import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { QUESTION_TYPE } from 'src/constants/mbti';

export class CreateQuestionDto{
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
  readonly contents: string;

  @ApiProperty({
    default : true,
    description : "활성화 여부",
    required: false,
    nullable: true
  })
  @IsOptional()
  @IsBoolean()
  readonly isActivate?: boolean;
}