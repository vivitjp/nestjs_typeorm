import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1696373280512 implements MigrationInterface {
    name = 'Migration1696373280512'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(16) NOT NULL COMMENT '名前', \`city\` varchar(255) NOT NULL COMMENT '都市', \`generalId\` int NOT NULL COMMENT 'GenID', UNIQUE INDEX \`IDX_a76c5cd486f7779bd9c319afd2\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a76c5cd486f7779bd9c319afd2\` ON \`company\``);
        await queryRunner.query(`DROP TABLE \`company\``);
    }

}
