import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class userDetails1678337541858 implements MigrationInterface {
    private readonly tableName = "user_deatils";
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
                  name: "first_name",
                  type: "varchar",
                  isNullable: false,
                  isUnique: true,
                },
                {
                  name: "last_name",
                  type: "varchar",
                  isNullable: false,
                },
                {
                    name: "cmsuser_id",
                    type: "uuid",
                    isPrimary: true,
                    isNullable: false,
                    default: "uuid_generate_v4()",
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

        await queryRunner.createForeignKey(
            this.tableName,
            new TableForeignKey({
                columnNames: ["cmsuser_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "cms_users",
                onDelete: "CASCADE",
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
