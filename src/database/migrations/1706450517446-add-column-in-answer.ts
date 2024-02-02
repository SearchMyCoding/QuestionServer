import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnInAnswer1706450517446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(
            "answer",
            [
                new TableColumn({
                    name: "sequence",
                    type: "int4",
                    generationStrategy: "increment"
                }),
                new TableColumn({
                    name: "createdAt",
                    type: "timestamptz",
                    isNullable: false
                }),
                new TableColumn({
                    name: "updatedAt",
                    type: "timestamptz",
                    isNullable: false
                }),
                new TableColumn({
                    name: "deletedAt",
                    type: "timestamptz",
                    isNullable: true
                })
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns(
            "answer",
            [
                "sequence",
                "createdAt",
                "updatedAt",
                "deletedAt"
            ]
        );
    }

}
