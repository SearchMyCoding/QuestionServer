import { UpdateAnswerDto } from 'src/dto/UpdateAnswer.dto';
import { CreateAnswerDto } from 'src/dto/CreateAnswer.dto';
import { Answer } from 'src/entities/answer.entity';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {
  DataSource,
  DeleteResult,
  FindManyOptions,
  FindOptionsWhere,
  InsertResult,
  QueryRunner,
  Repository,
  UpdateResult,
} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { createBaseCrudService } from '@exnest/extended-nest';
import { Question } from 'src/question/question.entity';

@Injectable()
export class AnswerService extends createBaseCrudService(Answer) {
  constructor(
    @InjectRepository(Answer)
    readonly repository: Repository<Answer>,
    private readonly datasource: DataSource,
  ) {
    super(repository);
  }
  override async read(targetOption?: FindManyOptions<Answer>, transaction = true): Promise<Answer[]> {
    return super.read(targetOption, transaction);
  }

  override async create(createDto: CreateAnswerDto | CreateAnswerDto[]): Promise<InsertResult> {
    const isArray: boolean = Array.isArray(createDto);
    const length: number = isArray ? (createDto as CreateAnswerDto[]).length : 1;

    const queryRunner: QueryRunner = this.datasource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const answers: Answer[] = await Promise.all(
        Array.from({ length }, async (_, index: number) => {
          const answer: Answer = this.repository.create(
            isArray ? (createDto as CreateAnswerDto[])[index] : (createDto as CreateAnswerDto),
          );

          const question: Question = await queryRunner.manager.findOne(Question, {
            where: {
              id: answer.question.id,
            },
          });

          if (!question) {
            throw new NotFoundException(`Fail to find ${Question.name} with ID ${question.id}`);
          }

          return answer;
        }),
      );

      const result: InsertResult = await queryRunner.manager.insert(Answer, answers);

      await queryRunner.commitTransaction();
      return result;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException(e);
    } finally {
      await queryRunner.release();
    }
  }

  override async update(targetOption: FindOptionsWhere<Answer>, updateDto: UpdateAnswerDto): Promise<UpdateResult> {
    const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const answers: Answer[] = await this.read(
        {
          where: targetOption,
        },
        false,
      );

      if (answers.length === 0) {
        throw new NotFoundException(`Fail to find ${Answer.name} with Option ${targetOption}`);
      }

      const result: UpdateResult = await queryRunner.manager.update(Answer, targetOption, updateDto);

      await queryRunner.commitTransaction();
      return;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async softDelete(targetOption: FindOptionsWhere<Answer>): Promise<UpdateResult> {
    const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const result: UpdateResult = await queryRunner.manager.softDelete(Answer, targetOption);

      await queryRunner.commitTransaction();
      return result;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async delete(targetOption: FindOptionsWhere<Answer>): Promise<DeleteResult> {
    const queryRunner: QueryRunner = this.repository.manager.connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const result: DeleteResult = await queryRunner.manager.delete(Answer, targetOption);

      await queryRunner.commitTransaction();
      return;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
