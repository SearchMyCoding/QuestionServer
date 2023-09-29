import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

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
    readonly answerType : string;

    @ApiProperty({
        description : "대답"
    })
    @IsString()
    readonly contents : string;
}