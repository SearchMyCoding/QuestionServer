import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateAnswerDto } from '../dto/UpdateAnswer.dto';
import { Answer } from 'src/entities/answer.entity';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from '../dto/CreateAnswer.dto';
import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';

@Controller('answer')
@ApiTags("답변 API")
export class AnswerController {
    constructor(private readonly answerService : AnswerService){}

    @Get()
    @ApiOperation({
        "summary" : "모든 답변 조회하는 요청",
        "description" : "모든 답변 배열 형태로 반환한다."
    })
    async getAllAnswers(){
        return await this.answerService.getAllAnswer();
    }

    @Get(':id')
    @ApiOperation({
        "summary" : "id를 이용한 답변 조회하는 요청",
        "description" : "id를 이용하여 답변을 조회하고 json 형태로 반환한다.(단, id에 맞는 답변을 찾지 못한다면 에러를 반환한다.)"
    })
    async getOneAnswer(@Param("id") answerId : number) : Promise<Answer>{
        return await this.answerService.getOneAnswer(answerId);
    }

    @Get('question/:id')
    @ApiOperation({
        "summary" : "id를 이용한 답변 조회하는 요청",
        "description" : "질문 id를 이용하여 답변을 조회하고 json 형태로 반환한다.(단, 한 개의 답변도 조회되지 않으면 에러를 반환한다.)"
    })
    async getAnswerAboutQuestion(@Param("id") questionId : number) : Promise<Answer[]> {
        return await this.answerService.getAnswerAboutQuestion(questionId);
    }

    @Post('')
    @ApiOperation({
        "summary":"답변을 생성하는 요청",
        "description":"body를 CreateAnswerDto에 맞춰 요청해야한다."
    })
    createAnswer(@Body() createAnswerDto : CreateAnswerDto){
        return this.answerService.createAnswer(createAnswerDto);
    }

    @Patch(':id')
    @ApiOperation({
        "summary" : "id를 이용하여 답변의 일부를 수정하는 요청",
        "description" : "id가 존재하여야 하며 body를 UpdateAnswerDto에 맞춰 요청해야한다."
    })
    patchAnswer(@Param('id') answerId : number,@Body() updateAnswerDto : UpdateAnswerDto){
        return this.answerService.patchAnswer(answerId, updateAnswerDto);
    }
}
