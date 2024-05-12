import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateAnswer1712460812932 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'answers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: false,
            isNullable: false,
            generationStrategy: 'uuid',
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
            name: 'answerType',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'questionId',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'answer',
      new TableForeignKey({
        columnNames: ['questionId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'question',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const answers = await queryRunner.getTable("answer")
    const foreignKey = answers.foreignKeys.find(
        (fk) => fk.columnNames.indexOf("questionId") !== -1,
    )
    await queryRunner.dropForeignKey("answer", foreignKey);
    await queryRunner.dropTable('answer');
  }
}
