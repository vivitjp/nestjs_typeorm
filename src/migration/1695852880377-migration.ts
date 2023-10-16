import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1695852880377 implements MigrationInterface {
    name = 'Migration1695852880377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`general\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(16) NOT NULL COMMENT '名前', \`age\` int NOT NULL COMMENT '年齢', \`act\` tinyint NOT NULL COMMENT '有効' DEFAULT 0, UNIQUE INDEX \`IDX_ab9ed1befeea847b85b8a00260\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`o2o_profile\` (\`id\` int NOT NULL AUTO_INCREMENT, \`photo\` varchar(255) NOT NULL COMMENT 'URL', \`personId\` int NULL, UNIQUE INDEX \`REL_b56cfc53b8f7b6020d53901f37\` (\`personId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`o2o_person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(16) NOT NULL COMMENT 'Name' DEFAULT '', INDEX \`IDX_b3bbf510954624709c3e16f799\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`o2o_profile\` ADD CONSTRAINT \`FK_b56cfc53b8f7b6020d53901f37b\` FOREIGN KEY (\`personId\`) REFERENCES \`o2o_person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`o2o_profile\` DROP FOREIGN KEY \`FK_b56cfc53b8f7b6020d53901f37b\``);
        await queryRunner.query(`DROP INDEX \`IDX_b3bbf510954624709c3e16f799\` ON \`o2o_person\``);
        await queryRunner.query(`DROP TABLE \`o2o_person\``);
        await queryRunner.query(`DROP INDEX \`REL_b56cfc53b8f7b6020d53901f37\` ON \`o2o_profile\``);
        await queryRunner.query(`DROP TABLE \`o2o_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_ab9ed1befeea847b85b8a00260\` ON \`general\``);
        await queryRunner.query(`DROP TABLE \`general\``);
    }

}
