import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAnswerTable1705066048854 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "answer",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        isNullable: false
                    },
                    {
                        name: "answerType",
                        type: "varchar",
                        length: "50"
                    },
                    {
                        name: "contents",
                        type: "varchar",
                        length: "500",
                        isUnique: true
                    },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("answer");
    }

}
