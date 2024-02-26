import { UpdateQuestionDto } from 'src/dto/UpdateQuestion.dto';
import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Question } from 'src/entities/question.entity';
import { CreateQuestionDto } from 'src/dto/CreateQuestion.dto';
import { QuestionService } from 'src/question/question.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { QUESTION_TYPE } from 'src/constants/mbti.constant';
import { UUID } from 'crypto';
import { RequestPaginationDto } from 'src/dto/RequestPagination.dto';
import { PaginationQuery } from 'src/decorators/pagination-query.decorator';

@Controller('questions')
@ApiTags('질문 API')
export class QuestionController {
    constructor(private readonly questionService: QuestionService){}

    @Get()
    @ApiOperation({
        "summary": "질문 조회하는 요청",
        "description": "질문 배열 형태로 반환한다.",
    })
    @ApiQuery({ type: RequestPaginationDto })
    @ApiQuery({
        name: "type",
        required: false
    })
    async getQuestions(
        @PaginationQuery()
        requestPaginationDto: RequestPaginationDto,
        @Query('type')
        questionType?: QUESTION_TYPE,
    ){
        if(!!questionType){
            return await this.questionService.getQuestionsWithType(questionType, requestPaginationDto);
        }
        return await this.questionService.getQuestions(requestPaginationDto);
    }

    @Get(':id')
    @ApiOperation({
        "summary": "id를 이용한 질문 조회하는 요청",
        "description": "id를 이용하여 질문을 조회하고 json 형태로 반환한다.(단, id에 맞는 답변을 찾지 못한다면 에러를 반환한다.)"
    })
    async getOneQuestion(
        @Param("id") questionId: UUID
    ): Promise<Question>{
        return await this.questionService.getOneQuestion(questionId);
    }

    @Post()
    @ApiOperation({
        "summary": "질문을 생성하는 요청",
        "description": "body를 CreateQuestionDto에 맞춰 요청해야한다."
    })
    createQuestion(
        @Body() createQuestionDto: CreateQuestionDto
    ){
        return this.questionService.createQuestion(createQuestionDto);
    }

    @Patch(':id')
    @ApiOperation({
        "summary": "id를 이용하여 질문의 일부를 수정하는 요청",
        "description": "id가 존재하여야 하며 body를 UpdateQuestionDto에 맞춰 요청해야한다."
    })
    patchQuestion(
        @Param('id') questionId: UUID,
        @Body() updateQuestionDto: UpdateQuestionDto
    ){
        return this.questionService.patchQuestion(questionId, updateQuestionDto);
    }
}
