import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateAnswerDto } from 'src/dto/UpdateAnswer.dto';
import { Answer } from 'src/entities/answer.entity';
import { AnswerService } from 'src/answer/answer.service';
import { CreateAnswerDto } from 'src/dto/CreateAnswer.dto';
import { Controller, Post, Body, Get, Param, Patch, Query } from '@nestjs/common';
import { UUID } from 'crypto';
import { RequestPaginationDto } from 'src/dto/RequestPagination.dto';
import { PaginationQuery } from 'src/decorators/pagination-query.decorator';

@Controller('answers')
@ApiTags("답변 API")
export class AnswerController {
    constructor(
        private readonly answerService : AnswerService
    ){}

    @Get()
    @ApiOperation({
        "summary" : "답변 조회하는 요청",
        "description" : "답변 배열 형태로 반환한다. 세부사항에 따라 쿼리에 담아서 전송한다."
    })
    @ApiQuery({ type: RequestPaginationDto })
    @ApiQuery({
        name: "questionId",
        required: false
    })
    async getAnswers(
        @PaginationQuery() requestPaginationDto: RequestPaginationDto,
        @Query("questionId") questionId?: UUID,
    ): Promise<Answer[]>{
        if(!!questionId){
            return await this.answerService.getAnswerAboutQuestion(questionId, requestPaginationDto);
        }
        return await this.answerService.getAnswers(requestPaginationDto);
    }

    @Post('')
    @ApiOperation({
        "summary":"답변을 생성하는 요청",
        "description":"body를 CreateAnswerDto에 맞춰 요청해야한다."
    })
    createAnswer(@Body() createAnswerDto: CreateAnswerDto){
        return this.answerService.createAnswer(createAnswerDto);
    }

    @Get(':id')
    @ApiOperation({
        "summary" : "id를 이용한 답변 조회하는 요청",
        "description" : "id를 이용하여 답변을 조회하고 json 형태로 반환한다.(단, id에 맞는 답변을 찾지 못한다면 에러를 반환한다.)"
    })
    async getOneAnswer(@Param("id") answerId: UUID): Promise<Answer>{
        return await this.answerService.getOneAnswer(answerId);
    }

    @Patch(':id')
    @ApiOperation({
        "summary" : "id를 이용하여 답변의 일부를 수정하는 요청",
        "description" : "id가 존재하여야 하며 body를 UpdateAnswerDto에 맞춰 요청해야한다."
    })
    patchAnswer(@Param('id') answerId: UUID, @Body() updateAnswerDto: UpdateAnswerDto){
        return this.answerService.patchAnswer(answerId, updateAnswerDto);
    }
}
