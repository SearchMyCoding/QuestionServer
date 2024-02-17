import { UpdateAnswerDto } from 'src/dto/UpdateAnswer.dto';
import { CreateAnswerDto } from 'src/dto/CreateAnswer.dto';
import { Answer } from 'src/entities/answer.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UUID, randomUUID } from 'crypto';
import { LocalDateTime } from '@js-joda/core';

@Injectable()
export class AnswerService {
    private answerRepository: Repository<Answer>;
    constructor(
        private readonly datasource: DataSource,
    ){
        this.answerRepository = this.datasource.getRepository("answer");
    }

    async getAnswers(): Promise<Answer[]>{
        return await this.answerRepository.find();
    }

    async getOneAnswer(answerId: UUID): Promise<Answer>{
        const FoundAnswer: Answer = await this.answerRepository.findOne({
            where: {
                id: answerId,
            }
        });
        if(!FoundAnswer)
            throw new NotFoundException(`Answer with Id ${answerId} is not found.`);
        return FoundAnswer;
    }

    async getAnswerAboutQuestion(questionId: UUID): Promise<Answer[]> {
        const FoundAnswers: Answer[] = await this.answerRepository.find({
            relations: {
                question: true
            },
            where: {
                question: {
                    id: questionId
                }
            }
        });
        return FoundAnswers;
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
    }

    async patchAnswer(answerId: UUID, updateAnswerDto: UpdateAnswerDto): Promise<void>{
        try{
            await this.getOneAnswer(answerId);
        }catch(err){
            throw err;
        }
        await this.answerRepository.update({id: answerId}, updateAnswerDto);
    }
}
