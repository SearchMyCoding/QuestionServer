import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createQuestionTable1705328699531 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'question',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
            isNullable: false,
          },
          {
            name: 'sequence',
            type: 'int',
            isGenerated: true,
            isNullable: false,
            generationStrategy: 'increment',
          },
          {
            name: 'createdAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamptz',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'deletedAt',
            type: 'timestamptz',
            isGenerated: false,
            isNullable: true,
          },
          {
            name: 'questionType',
            type: 'varchar',
            isNullable: false,
            length: '20',
          },
          {
            name: 'isActivate',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('question');
  }
}
