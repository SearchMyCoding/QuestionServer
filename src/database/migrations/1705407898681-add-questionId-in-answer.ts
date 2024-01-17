import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableUnique} from "typeorm";

export class addQuestionIdInAnswer1705407898681 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "answer",
            new TableColumn({
                name: "questionId",
                type: "int",
                isNullable: false
            })
        )
        await queryRunner.createForeignKey(
            "answer",
            new TableForeignKey({
                columnNames: ["questionId"],
                referencedColumnNames: ["id"],
                referencedTableName: "question",
                onDelete: "CASCADE"
            })
        );
        await queryRunner.createUniqueConstraint(
            "answer",
            new TableUnique({
                name: "uniqueAnswerQuestion",
                columnNames: ["id", "questionId"],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table : Table = await queryRunner.getTable("answer");
        const foreignKey : TableForeignKey = table.foreignKeys.find(
            (fk : TableForeignKey) => fk.columnNames.indexOf("questionId") !== -1
        );
        await queryRunner.dropForeignKey("answer", foreignKey);
        await queryRunner.dropColumn("answer", "questionId");
        await queryRunner.dropUniqueConstraint("answer", "uniqueAnswerQuestion");
    }

}
