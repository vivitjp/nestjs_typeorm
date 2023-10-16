import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1697167014107 implements MigrationInterface {
    name = 'Migration1697167014107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`o2o_main\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(16) NOT NULL COMMENT 'Name' DEFAULT '', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`o2o_sub\` (\`main_id\` int NOT NULL, \`memo\` varchar(255) NOT NULL COMMENT 'Memo', PRIMARY KEY (\`main_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`o2o_sub\` ADD CONSTRAINT \`FK_f45c9b3876f1e3b9137dca19c7b\` FOREIGN KEY (\`main_id\`) REFERENCES \`o2o_main\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`o2o_sub\` DROP FOREIGN KEY \`FK_f45c9b3876f1e3b9137dca19c7b\``);
        await queryRunner.query(`DROP TABLE \`o2o_sub\``);
        await queryRunner.query(`DROP TABLE \`o2o_main\``);
    }

}
