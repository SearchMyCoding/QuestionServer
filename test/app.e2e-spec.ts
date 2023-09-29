import { UpdateAnswerDto } from './../src/dto/UpdateAnswer.dto';
import { testTypeORMConfig } from './../src/config/typeorm.config';
import { AnswerModule } from '../src/answer/answer.module';
import { QuestionModule } from './../src/question/question.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CreateAnswerDto } from './../src/dto/CreateAnswer.dto';
import { UpdateQuestionDto } from './../src/dto/UpdateQuestion.dto';
import { validationConfig } from './../src/config/validation.config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CreateQuestionDto } from 'src/dto/CreateQuestion.dto';
import { clearDB } from './testHelper';
describe('AppController (e2e)', () => {
  let app: INestApplication;

  /// beforeEach는 test 전마다 하는 각각의 작업을 뜻하며
  /// beforeAll은 test 전체를 하기 전 하나의 작업을 말한다.
  /// 한 번 app 생성 후 데이터를 유지하기 위해 beforEach -> beforeAll
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRoot(testTypeORMConfig),
        QuestionModule,
        AnswerModule,
      ],
    }).compile();

    /// beforeEach시
    /// 테스트마다 app 생성
    /// 이때 생성하는 app은 main.ts에 있는 app과는 다른 테스트용 어플리케이션
    app = moduleFixture.createNestApplication();
    /// 테스트 환경에서도 실제 환경과 동일한 환경을 제공해야 제대로 된 테스트가 된다.
    /// 만약 아래의 pipe 부분이 없다면 parameter가 항상 string으로 된다.
    app.useGlobalPipes(new ValidationPipe(validationConfig));
    await app.init();
  });

  /// 모든 것이 끝나면 app 종료
  afterAll(async ()=>{
    await clearDB();
    await app.close();
  })

  describe('/question', () => {
    const defaultPath = '/question';
    
    it("GET / (200)", ()=>{
      return request(app.getHttpServer())
        .get(defaultPath)
        .expect(200);
    });

    it("POST / (201)", ()=>{
      const createQuestionDto : CreateQuestionDto = {
        questionType : 'EI',
        contents : '한 달 동안 공부, 프로젝트에 매진해 있어서 제대로 쉰 날이 하루도 없다... <br/>가까스로 다 끝낸 뒤 나는?',
        activate : true
      }

      return request(app.getHttpServer())
        .post(defaultPath)
        .send(createQuestionDto)
        .expect(201);
    });

    it("POST / (400)", ()=>{
      const createErrorQuestionDto = {
        questionType : 'EI',
        contents : '한 달 동안 공부, 프로젝트에 매진해 있어서 제대로 쉰 날이 하루도 없다... <br/>가까스로 다 끝낸 뒤 나는?',
        activate : true,
        author : "Jaemin"
      }

      return request(app.getHttpServer())
        .post(defaultPath)
        .send(createErrorQuestionDto)
        .expect(400);
    });
    
    it("GET /:id (200)", ()=>{
      const findId : number = 1;
      
      return request(app.getHttpServer())
        .get(defaultPath+`/${findId}`)
        .expect(200);
    });

    it("GET /:id (404)", ()=>{
      const findErrorId : number = 999;
      
      return request(app.getHttpServer())
        .get(defaultPath+`/${findErrorId}`)
        .expect(404);
    });

    it("GET /type/:type (200)", ()=>{
      const findQuestionType : string = 'EI';
      return request(app.getHttpServer())
        .get(defaultPath+`/type/${findQuestionType}`)
        .expect(200);
    });

    it("GET /type/:type (404)", ()=>{
      const findErrorQuestionType : string = 'SN';
      return request(app.getHttpServer())
        .get(defaultPath+`/type/${findErrorQuestionType}`)
        .expect(404);
    });

    it("PATCH /:id (200)", ()=>{
      const updateQuestionId : number = 1;
      const updateQuestionDto : UpdateQuestionDto = {
        activate : false
      };
      return request(app.getHttpServer())
        .patch(defaultPath+`/${updateQuestionId}`)
        .send(updateQuestionDto)
        .expect(200);
    });

    it("PATCH /:id (404)", ()=>{
      const updateErrorQuestionId : number = 999;
      const updateQuestionDto : UpdateQuestionDto = {
        activate : false
      };
      return request(app.getHttpServer())
        .patch(defaultPath+`/${updateErrorQuestionId}`)
        .send(updateQuestionDto)
        .expect(404);
    });

    it("PATCH /:id (400)", ()=>{
      const updateQuestionId : number = 1;
      const updateErrorQuestionDto = {
        activate : false,
        author : "Jaemin"
      };
      return request(app.getHttpServer())
        .patch(defaultPath+`/${updateQuestionId}`)
        .send(updateErrorQuestionDto)
        .expect(400);
    });
  });

  describe("/answer", ()=>{
    const defaultPath = '/answer'
    it("GET / (200)", ()=>{
      return request(app.getHttpServer())
        .get(defaultPath)
        .expect(200);
    });

    it("POST / (201)", ()=>{
      const createAnswerDto : CreateAnswerDto = {
        answerType : 'E',
        contents : '한 달 동안 못 논 게 한이다! 친구들과 만나 파워 수다!',
        questionId : 1
      }

      return request(app.getHttpServer())
        .post(defaultPath)
        .send(createAnswerDto)
        .expect(201);
    });

    it("POST / (400)", ()=>{
      const createErrorAnswerDto = {
        answerType : 'E',
        contents : '한 달 동안 못 논 게 한이다! 친구들과 만나 파워 수다!',
        questionId : 1,
        author : "Jaemin"
      }

      return request(app.getHttpServer())
        .post(defaultPath)
        .send(createErrorAnswerDto)
        .expect(400);
    });

    it("GET /:id (200)", ()=>{
      const findId = 1;
      return request(app.getHttpServer())
        .get(defaultPath+`/${findId}`)
        .expect(200);
    });

    it("GET /:id (404)", ()=>{
      const findErrorId = 999;
      return request(app.getHttpServer())
        .get(defaultPath+`/${findErrorId}`)
        .expect(404);
    });

    it("GET /question/:id (200)", ()=>{
      const findQuestionId = 1;
      return request(app.getHttpServer())
        .get(defaultPath+`/question/${findQuestionId}`)
        .expect(200);
    });

    it("GET /question/:id (404)", ()=>{
      const findErrorQuestionId = 999;
      return request(app.getHttpServer())
        .get(defaultPath+`/question/${findErrorQuestionId}`)
        .expect(404);
    });

    it("PATCH /:id (200)", ()=>{
      const updateAnswerId : number = 1;
      const updateAnswerDto : UpdateAnswerDto = {
        answerType : 'I',
        contents : '에너지 충전해야해.. 집콕.. 침대 최고...'
      }
      return request(app.getHttpServer())
        .patch(defaultPath+`/${updateAnswerId}`)
        .send(updateAnswerDto)
        .expect(200);
    });

    it("PATCH /:id (400)", ()=>{
      const updateAnswerId : number = 1;
      const updateErrorAnswerDto = {
        answerType : 'I',
        contents : '에너지 충전해야해.. 집콕.. 침대 최고...',
        author : "Jaemin"
      }
      return request(app.getHttpServer())
        .patch(defaultPath+`/${updateAnswerId}`)
        .send(updateErrorAnswerDto)
        .expect(400);
    });

    it("PATCH /:id (404)", ()=>{
      const updateErrorAnswerId : number = 999;
      const updateAnswerDto : UpdateAnswerDto = {
        answerType : 'I',
        contents : '에너지 충전해야해.. 집콕.. 침대 최고...'
      }
      return request(app.getHttpServer())
        .patch(defaultPath+`/${updateErrorAnswerId}`)
        .send(updateAnswerDto)
        .expect(404);
    });
  })
});
