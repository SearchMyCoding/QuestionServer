import { ExtendedBaseCreateDto } from '@exnest/extended-nest';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { MBTI_SINGLE_TEMPLATE_TYPE } from 'src/constants/mbti.constant';
import { Answer } from 'src/answer/answer.entity';

export class CreateAnswerRequestDto extends ExtendedBaseCreateDto<Answer> {
  @ApiProperty({
    description: '질문',
    required: true,
    nullable: false,
  })
  @IsUUID()
  readonly questionId: UUID;

  @ApiProperty({
    description: '대답 유형',
    required: true,
    nullable: false,
  })
  @IsString()
  readonly answerType: MBTI_SINGLE_TEMPLATE_TYPE;

  @ApiProperty({
    description: '대답',
    required: true,
    nullable: false,
    uniqueItems: true,
  })
  @IsString()
  readonly contents: string;
}
