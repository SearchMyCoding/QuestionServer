import { UpdateQuestionDto } from '../dto/UpdateQuestion.dto';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Question } from 'src/entities/question.entity';
import { CreateQuestionDto } from '../dto/CreateQuestion.dto';
import { QuestionService } from './question.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('question')
@ApiTags('질문 API')
export class QuestionController {
    constructor(private readonly questionService : QuestionService){}

    @Get()
    @ApiOperation({
        "summary" : "모든 질문 조회하는 요청",
        "description" : "모든 질문 배열 형태로 반환한다."
    })
    async getAllQuestions(){
        return await this.questionService.getAllQuestions();
    }

    @Get(':id')
    @ApiOperation({
        "summary" : "id를 이용한 질문 조회하는 요청",
        "description" : "id를 이용하여 질문을 조회하고 json 형태로 반환한다.(단, id에 맞는 답변을 찾지 못한다면 에러를 반환한다.)"
    })
    async getOneQuestion(@Param("id") questionId : number) : Promise<Question>{
        return await this.questionService.getOneQuestion(questionId);
    }

    @Get('type/:type')
    @ApiOperation({
        "summary" : "type을 이용한 질문 조회하는 요청",
        "description" : "type을 이용하여 질문을 조회하고 json 형태로 반환한다.(단, 한 개의 답변도 조회되지 않으면 에러를 반환한다.)"
    })
    async getQuestionsWithType(@Param("type") questionType : string) : Promise<Question[]>{
        return await this.questionService.getQuestionsWithType(questionType);
    }

    @Post()
    @ApiOperation({
        "summary":"질문을 생성하는 요청",
        "description":"body를 CreateQuestionDto에 맞춰 요청해야한다."
    })
    createQuestion(@Body() createQuestionDto : CreateQuestionDto){
        return this.questionService.createQuestion(createQuestionDto);
    }

    @Patch(':id')
    @ApiOperation({
        "summary" : "id를 이용하여 질문의 일부를 수정하는 요청",
        "description" : "id가 존재하여야 하며 body를 UpdateQuestionDto에 맞춰 요청해야한다."
    })
    patchQuestion(@Param('id') questionId : number, @Body() updateQuestionDto : UpdateQuestionDto){
        return this.questionService.patchQuestion(questionId, updateQuestionDto);
    }
}
