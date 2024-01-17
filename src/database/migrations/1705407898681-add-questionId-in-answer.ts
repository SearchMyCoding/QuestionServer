import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class addQuestionIdInAnswer1705407898681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            "answer",
            new TableForeignKey({
                columnNames: ["questionId"],
                referencedColumnNames: ["id"],
                referencedTableName: "question",
                onDelete: "CASCADE"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table : Table = await queryRunner.getTable("answer");
        const foreignKey : TableForeignKey = table.foreignKeys.find(
            (fk : TableForeignKey) => fk.columnNames.indexOf("questionId") !== -1
        );
        await queryRunner.dropForeignKey("answer", foreignKey);
    }

}
