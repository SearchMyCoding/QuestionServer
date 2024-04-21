import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { UpdateQuestionDto } from 'src/dto/UpdateQuestion.dto';
import { CreateQuestionDto } from 'src/dto/CreateQuestion.dto';
import { Question } from 'src/entities/question.entity';
import { QUESTION_TYPE } from 'src/constants/mbti.constant';
import { UUID, randomUUID } from 'crypto';
import { LocalDateTime } from '@js-joda/core';
import { RequestPaginationDto } from 'src/dto/RequestPagination.dto';

@Injectable()
export class QuestionService {
    private readonly questionRepository: Repository<Question>;
    constructor(
        private readonly datasource: DataSource        
    ){
        this.questionRepository = this.datasource.getRepository("question");
    }

    async getQuestions(requestPaginationDto: RequestPaginationDto): Promise<Question[]>{
        const { skip, limit, sort, afterBy } = requestPaginationDto;

        return await this.questionRepository.find({
            order: {
                sequence: sort
            },
            skip,
            take: limit,
            where: {
                sequence: sort === 'ASC' ? MoreThanOrEqual(afterBy) : LessThanOrEqual(afterBy)
            }
        });
    }

    async getOneQuestion(questionId: UUID): Promise<Question>{
        const FoundQuestion: Question = await this.questionRepository.findOne({
            where: {
                id: questionId
            }
        });
        if(!FoundQuestion)
            throw new NotFoundException(`Question with Id ${questionId} is not found.`);
        return FoundQuestion;
    }

    async getQuestionsWithType(questionType: QUESTION_TYPE, requestPaginationDto: RequestPaginationDto): Promise<Question[]>{
        const { skip, limit, sort, afterBy } = requestPaginationDto;

        const FoundQuestions: Question[] = await this.questionRepository.find({
            where : {
                questionType
            },
            order: {
                sequence: sort
            },
            skip,
            take: limit,
        });
        
        return FoundQuestions;
    }

    async createQuestion(createQuestionDto: CreateQuestionDto) : Promise<void>{
        const { questionType, contents, isActivate } = createQuestionDto;
        const now: LocalDateTime = LocalDateTime.now();
        const newQuestion: Question = this.questionRepository.create({
            id: randomUUID(),
            createdAt: now,
            updatedAt: now,
            contents,
            questionType,
            isActivate: (isActivate??true)
        })
        await this.questionRepository
            .createQueryBuilder()
            .insert()
            .into(Question)
            .values(newQuestion)
            .updateEntity(false)
            .execute();
    }

    async patchQuestion(questionId: UUID, updateQuestionDto: UpdateQuestionDto) : Promise<void>{
        const now: LocalDateTime = LocalDateTime.now();
        try{
            await this.getOneQuestion(questionId);
        }catch(err){
            throw err;
        }
        await this.questionRepository.update(
            {
                id: questionId
            },
            {
                ...updateQuestionDto,
                updatedAt: now
            }
        );
    }

    async getRandomQuestions(amountOfQuestion : number, questionType : QUESTION_TYPE){
        const isInteger: boolean = Number.isInteger(amountOfQuestion);

        if(!isInteger){
            throw new BadRequestException(`${amountOfQuestion} is not Integer.`);
        }

        const isNegative: boolean = amountOfQuestion < 0;

        if(isNegative){
            throw new BadRequestException(`${amountOfQuestion} is negative Integer.`);
        }

        const maximum: number = await this.questionRepository.count({
            where: {
                questionType
            }
        });

        const isOverflow: boolean = amountOfQuestion > maximum;
        const maximumOfLoop: number = isOverflow ? maximum : amountOfQuestion;

        const indexList: number[] = Array.from({ length: maximum }, (_, index) => index);
        const result: number[] = [];

        while(result.length < maximumOfLoop){
            const randomNumber = Math.floor(Math.random() * (indexList.length + 1));
            result.push(indexList[randomNumber]);
            indexList[randomNumber] = indexList[indexList.length - 1];
            indexList.pop();
        }

        const questions: Question[] = 
            await this.questionRepository
                .createQueryBuilder()
                .whereInIds(result)
                .getMany();

        return {
            type: questionType,
            questions
        };
    }
}
