import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateQuestionDto } from '../dto/UpdateQuestion.dto';
import { CreateQuestionDto } from '../dto/CreateQuestion.dto';
import { Question } from '../entities/question.entity';
import { Repository } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockQuestionRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  insert: jest.fn()
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('QuestionsService', () => {
  let service: QuestionService;
  let questionRepository: MockRepository<Question>;
  let mockedQuestion : Question;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide : getRepositoryToken(Question),
          useValue : mockQuestionRepository()
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    questionRepository = module.get<MockRepository<Question>>(
      getRepositoryToken(Question),
    );
    mockedQuestion = {
      id : 1,
      questionType : 'EI',
      contents : '한 달 동안 공부, 프로젝트에 매진해 있어서 제대로 쉰 날이 하루도 없다... <br/>가까스로 다 끝낸 뒤 나는?',
      activate : true,
      answer : []
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllQuestions', ()=>{
    it('should find all questions', async ()=>{
      /// jest fn()에 대한 resolved 값
      questionRepository.find.mockResolvedValue([]);

      const result = await service.getAllQuestions();
      /// 정확히 1회만큼 호출
      expect(questionRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOneQuestion', ()=>{
    const findId : number = 1;
    const findErrorId : number = 999;
    it('should find a question',async ()=>{
      questionRepository.findOne.mockResolvedValue(mockedQuestion);

      const result = await service.getOneQuestion(findId);
      expect(questionRepository.findOne).toHaveBeenCalledTimes(1);

      expect(result).toEqual(mockedQuestion);
    });

    it("should return a NotFoundException", async () => {
      try{
        await service.getOneQuestion(findErrorId);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe("getQuestionsWithType", ()=>{
    const findQuestionType : string = 'EI';
    const findErrorQuestionType : string = 'SN';
    it('should find questions with Type',async ()=>{
      questionRepository.find.mockResolvedValue([mockedQuestion]);

      const result = await service.getQuestionsWithType(findQuestionType);
      expect(questionRepository.find).toHaveBeenCalledTimes(1);

      expect(result.length).toEqual(1);
      expect(result[0].questionType).toEqual('EI');
    });

    it("should return a NotFoundException", async () => {
      try{
        await service.getQuestionsWithType(findErrorQuestionType);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  })

  describe("createQuestion",()=>{
    const mockedCreateQuestionDto : CreateQuestionDto = {
      questionType : 'EI',
      contents : '한 달 동안 공부, 프로젝트에 매진해 있어서 제대로 쉰 날이 하루도 없다... <br/>가까스로 다 끝낸 뒤 나는?',
      activate : true
    }

    const mockedErrorCreateQuestionDto = {
      questionType : 'EI'
    }

    it("should create a question", async () => {
      questionRepository.find.mockResolvedValue([]);
      const BeforeCreate = (await service.getAllQuestions()).length;
      expect(questionRepository.find).toHaveBeenCalledTimes(1);
      
      const result = await service.createQuestion(mockedCreateQuestionDto);

      questionRepository.find.mockResolvedValue([mockedQuestion]);
      const AfterCreate = (await service.getAllQuestions()).length;
      expect(questionRepository.find).toHaveBeenCalledTimes(2);

      expect(AfterCreate).toEqual(BeforeCreate + 1);
    });

    it("should return a BadRequestException", async () => {
      try{
        await service.createQuestion(mockedErrorCreateQuestionDto as CreateQuestionDto);
      }catch(e){
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("patchQuestion", ()=>{
    const mockedUpdateQuestionId : number = 1;
    const mockedErrorUpdateQuestionId : number = 999;
    const mockedUpdateQuestionDto : UpdateQuestionDto = {
      activate : false
    }
    const mockedUpdateQuestion : Question = {
      id : 1,
      questionType : "EI",
      contents : '한 달 동안 공부, 프로젝트에 매진해 있어서 제대로 쉰 날이 하루도 없다... <br/>가까스로 다 끝낸 뒤 나는?',
      activate : false,
      answer : []
    };
    const mockedErrorUpdateQuestionDto = {
      author : "noname"
    }

    it("should patch a question", async () => {
      questionRepository.findOne.mockResolvedValue(mockedQuestion);
      const BeforeUpdate = await service.getOneQuestion(mockedUpdateQuestionId);
      expect(questionRepository.findOne).toHaveBeenCalledTimes(1);
      
      const result = await service.patchQuestion(mockedUpdateQuestionId, mockedUpdateQuestionDto)

      questionRepository.findOne.mockResolvedValue(mockedUpdateQuestion);
      const AfterUpdate = await service.getOneQuestion(mockedUpdateQuestionId);
      /// patchQuestion에도 findOne이 있기에 3번 call된다. 2를 넣으면 Error가 뜬다.
      expect(questionRepository.findOne).toHaveBeenCalledTimes(3);

      expect(BeforeUpdate.id).toEqual(AfterUpdate.id);
      expect(BeforeUpdate.contents).toEqual(AfterUpdate.contents);
      expect(BeforeUpdate.activate).toBeTruthy();
      expect(mockedUpdateQuestionDto.activate).toBeFalsy();
      expect(AfterUpdate.activate).toBeFalsy();
    });
    
    it("should return a NotFoundException", async () => {
      questionRepository.findOne.mockResolvedValue(mockedQuestion);
      const BeforeUpdate = await service.getOneQuestion(mockedUpdateQuestionId);
      expect(questionRepository.findOne).toHaveBeenCalledTimes(1);
      try{
        await service.patchQuestion(mockedErrorUpdateQuestionId, mockedUpdateQuestionDto);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

    it("should return a BadRequestException", async () => {
      questionRepository.findOne.mockResolvedValue(mockedQuestion);
      const BeforeUpdate = await service.getOneQuestion(mockedUpdateQuestionId);
      expect(questionRepository.findOne).toHaveBeenCalledTimes(1);
      try{
        await service.patchQuestion(mockedUpdateQuestionId, mockedErrorUpdateQuestionDto as UpdateQuestionDto);
      }catch(e){
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
