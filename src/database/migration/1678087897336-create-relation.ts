import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class createRelation1678087897336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "tasks",
            new TableColumn({
                name: "cmsuser_id",
                type: "uuid",
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            "tasks",
            new TableForeignKey({
                columnNames: ["cmsuser_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "cms_users",
                onDelete: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("tasks")
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("cmsuser_id"),
        )
        await queryRunner.dropForeignKey("tasks", foreignKey)
        await queryRunner.dropColumn("tasks", "cmsuser_id")
    }

}
