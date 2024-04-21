import { UpdateAnswerDto } from 'src/dto/UpdateAnswer.dto';
import { CreateAnswerDto } from 'src/dto/CreateAnswer.dto';
import { Answer } from 'src/entities/answer.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { UUID, randomUUID } from 'crypto';
import { LocalDateTime } from '@js-joda/core';
import { RequestPaginationDto } from 'src/dto/RequestPagination.dto';

@Injectable()
export class AnswerService {
    private answerRepository: Repository<Answer>;
    constructor(
        private readonly datasource: DataSource,
    ){
        this.answerRepository = this.datasource.getRepository("answer");
    }

    async getAnswers(requestPaginationDto: RequestPaginationDto): Promise<Answer[]>{
        const { skip, limit, sort, afterBy } = requestPaginationDto;

        return await this.answerRepository.find({
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

    async getAnswerAboutQuestion(questionId: UUID, requestPaginationDto: RequestPaginationDto): Promise<Answer[]> {
        const { skip, limit, sort } = requestPaginationDto;

        const FoundAnswers: Answer[] = await this.answerRepository.find({
            relations: {
                question: true
            },
            where: {
                question: {
                    id: questionId
                }
            },
            order: {
                sequence: sort
            },
            skip,
            take: limit,
        });
        return FoundAnswers;
    }


    async getOneAnswer(answerId: UUID): Promise<Answer>{
        const FoundAnswer: Answer = await this.answerRepository.findOne({
            where: {
                id: answerId,
            }
        });
        if(!FoundAnswer){
            throw new NotFoundException(`Answer with Id ${answerId} is not found.`);
        }
        return FoundAnswer;
    }

    async createAnswer(createAnswerDto: CreateAnswerDto): Promise<void>{
        const {answerType, questionId, contents} = createAnswerDto;
        const now: LocalDateTime = LocalDateTime.now();
        const newAnswer: Answer = this.answerRepository.create({
            id: randomUUID(),
            createdAt: now,
            updatedAt: now,
            answerType,
            contents,
            question: {
                id: questionId
            }
        });

        await this.answerRepository.insert(newAnswer);
        
        const queryRunner = this.datasource.createQueryRunner();
        try{
            await queryRunner.connect();
            await queryRunner.startTransaction();

            await queryRunner.manager.getRepository("answer").insert(newAnswer);

            await queryRunner.commitTransaction();
        } catch (err) {
            queryRunner.rollbackTransaction();
            throw err;
        } finally {
            queryRunner.release();
        }
    }

    async patchAnswer(answerId: UUID, updateAnswerDto: UpdateAnswerDto): Promise<void>{
        const now: LocalDateTime = LocalDateTime.now();
        try{
            await this.getOneAnswer(answerId);
        }catch(err){
            throw err;
        }
        await this.answerRepository.update(
            {
                id: answerId
            }, 
            {
                ...updateAnswerDto,
                updatedAt: now
            });
    }
}
