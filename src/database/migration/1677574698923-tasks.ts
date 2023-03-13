import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class tasks1677574698923 implements MigrationInterface {

    private readonly tableName = "tasks";
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
            name: this.tableName,
            columns: [
                {
                name: "id",
                type: "uuid",
                isPrimary: true,
                isNullable: false,
                default: "uuid_generate_v4()",
                },
                {
                name: "title",
                type: "varchar",
                isNullable: true,
                isUnique: false,
                },
                {
                name: "description",
                type: "varchar",
                isNullable: true,
                },
                {
                name: "hours",
                type: "float",
                isNullable: true,
                },
                {
                name: "status",
                type: "smallint",
                isNullable: false,
                default: 1,
                comment: '1->pending, 2->inprogress, 3->completed'
                },
                {
                name: "created_at",
                type: "timestamptz",
                isNullable: false,
                default: "now()",
                },
                {
                name: "updated_at",
                type: "timestamptz",
                isNullable: false,
                default: "now()",
                },
            ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName);
    }

}
