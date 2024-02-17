import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { MBTI_SINGLE_TEMPLATE_TYPE } from 'src/constants/mbti.constant';

export class CreateAnswerDto{
    @ApiProperty({
        description: "질문",
        required: true,
        nullable: false
    })
    @IsUUID()
    readonly questionId: UUID;

    @ApiProperty({
        description: "대답 유형",
        required: true,
        nullable: false
    })
    @IsString()
    readonly answerType : MBTI_SINGLE_TEMPLATE_TYPE;

    @ApiProperty({
        description: "대답",
        required: true,
        nullable: false,
        uniqueItems: true
    })
    @IsString()
    readonly contents : string;
}