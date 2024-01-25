import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeSchema1706105046332 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "answer",
            "id",
            new TableColumn({
                name: "id",
                type: "uuid",
                isPrimary: true,
                isGenerated: true,
                isNullable: false
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            "answer",
            "id",
            new TableColumn({
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                isNullable: false
            })
        );
    }

}
