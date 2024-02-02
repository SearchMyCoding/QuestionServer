import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { QUESTION_TYPE } from 'src/constants/type';

export class CreateQuestionDto{
    @ApiProperty({
        description : "질문 유형",
        required: true,
        nullable: false,
    })
    @IsString()
    readonly questionType : QUESTION_TYPE;

    @ApiProperty({
        description : "질문 내용"
    })
    @IsString()
    readonly contents : string;

    @ApiProperty({
        default : true,
        description : "활성화 여부"
    })
    @IsOptional()
    @IsBoolean()
    readonly isActivate : boolean;
}