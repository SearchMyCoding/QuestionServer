import { UpdateQuestionDto } from '../dto/UpdateQuestion.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/CreateQuestion.dto';
import { Question } from '../entities/question.entity';

@Injectable()
export class QuestionService {
    private readonly questionRepository : Repository<Question>;
    constructor(
        private readonly datasource : DataSource        
    ){
        this.questionRepository = this.datasource.getRepository("question");
    }

    async getAllQuestions() : Promise<Question[]>{
        return await this.questionRepository.find();
    }

    async getOneQuestion(questionId : number) : Promise<Question>{
        const FoundQuestion : Question = await this.questionRepository.findOne({
            where: {
                id: questionId
            }
        });
        if(!FoundQuestion)
            throw new NotFoundException(`Question with Id ${questionId} is not found.`);
        return FoundQuestion;
    }

    async getQuestionsWithType(questionType : string) : Promise<Question[]>{
        const FoundQuestions : Question[] = await this.questionRepository.find({
            where : {
                questionType
            }
        })
        if(!FoundQuestions || FoundQuestions.length === 0)
            throw new NotFoundException(`Questions with type ${questionType} is not found.`);
        return FoundQuestions;
    }

    async createQuestion(createQuestionDto : CreateQuestionDto) : Promise<void>{
        const {questionType, contents, isActivate} = createQuestionDto;
        const newQuestion : Question = this.questionRepository.create({
            questionType,
            contents,
            isActivate
        })
        await this.questionRepository.insert(newQuestion);
    }

    async patchQuestion(questionId :number, updateQuestionData : UpdateQuestionDto) : Promise<void>{
        try{
            await this.getOneQuestion(questionId);
        }catch(err){
            throw err;
        }
        await this.questionRepository.update({id : questionId},updateQuestionData);
    }

    async getRandomQuestionIds(amountOfQuestion : number){
        const isInteger : boolean = Number.isInteger(amountOfQuestion);

        if(!isInteger){
            throw new BadRequestException(`${amountOfQuestion} is not Integer.`);
        }

        const isNegative : boolean = amountOfQuestion < 0;

        if(isNegative){
            throw new BadRequestException(`${amountOfQuestion} is negative Integer.`);
        }

        const maximum : number = await this.questionRepository.count();
        const indexList : number[] = Array.from({length : maximum}, (_, index) => index);
        const result : number[] = [];

        while(result.length < amountOfQuestion){
            const randomNumber = Math.floor(Math.random() * (indexList.length + 1));
            result.push(indexList[randomNumber]);
            indexList[randomNumber] = indexList[indexList.length - 1];
            indexList.pop();
        }

        return result;
    }
}
