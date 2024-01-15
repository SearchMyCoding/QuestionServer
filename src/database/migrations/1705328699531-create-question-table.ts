import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createQuestionTable1705328699531 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "question",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        isNullable: false
                    },
                    {
                        name: "questionType",
                        type: "varchar",
                        length: "20",
                    },
                    {
                        name: "isActivate",
                        type: "boolean",
                        default: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
