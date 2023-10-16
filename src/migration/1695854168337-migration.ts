import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695854168337 implements MigrationInterface {
    name = 'Migration1695854168337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`o2o_person\` ADD \`age\` int NOT NULL COMMENT '年齢' DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`o2o_person\` DROP COLUMN \`age\``);
    }

}
