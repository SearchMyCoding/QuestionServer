import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { MBTI_SINGLE_TEMPLATE_TYPE } from 'src/constants/type';

export class CreateAnswerDto{
    @ApiProperty({
        description : "질문"
    })
    @IsNumber()
    readonly questionId : number;

    @ApiProperty({
        description : "대답 유형"
    })
    @IsString()
    readonly answerType : MBTI_SINGLE_TEMPLATE_TYPE;

    @ApiProperty({
        description : "대답"
    })
    @IsString()
    readonly contents : string;
}