import { UpdateAnswerDto } from '../dto/UpdateAnswer.dto';
import { CreateAnswerDto } from '../dto/CreateAnswer.dto';
import { Answer } from '../entities/answer.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Question } from '../entities/question.entity';

@Injectable()
export class AnswerService {
    private answerRepository : Repository<Answer>;
    private questionRepository : Repository<Question>;
    constructor(
        private readonly datasource : DataSource,
    ){
        this.answerRepository = this.datasource.getRepository("answer");
        this.questionRepository = this.datasource.getRepository("question");
    }

    async getAllAnswer() : Promise<Answer[]>{
        return await this.answerRepository.find();
    }

    async getOneAnswer(answerId : number) : Promise<Answer>{
        const FoundAnswer : Answer = await this.answerRepository.findOne({
            where : {
                id: answerId,
            }
        });
        if(!FoundAnswer)
            throw new NotFoundException(`Answer with Id ${answerId} is not found.`);
        return FoundAnswer;
    }

    async getAnswerAboutQuestion(questionId : number) : Promise<Answer[]>{
        const FoundQuestion : Question = await this.questionRepository.findOne({
            where : {
                id: questionId
            },
            relations: ["answer"]
        });
        if(!FoundQuestion)
            throw new NotFoundException(`Question with Id ${questionId} is not found`);
        
        return FoundQuestion.answer;
    }

    async createAnswer(createAnswerDto : CreateAnswerDto) : Promise<void>{
        const {answerType, questionId, contents} = createAnswerDto;
        const question : Question = await this.questionRepository.findOne({
            where : {
                id: questionId
            },
            relations: ["answer"]
        });
        const newAnswer : Answer = this.answerRepository.create({
            answerType : answerType,
            question : questionId,
            contents : contents
        });
        await this.answerRepository.insert(newAnswer);
        const answer : Answer = await this.answerRepository.findOne({
            where: { contents }
        });
        
        question.answer.push(answer);
        await this.questionRepository.save(question);
    }

    async patchAnswer(answerId :number, updateAnswerDto : UpdateAnswerDto) : Promise<void>{
        try{
            await this.getOneAnswer(answerId);
        }catch(err){
            throw err;
        }
        await this.answerRepository.update({id : answerId}, updateAnswerDto);
    }
}
