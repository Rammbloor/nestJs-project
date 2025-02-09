import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhotoUrlColumToTask1739104898730 implements MigrationInterface {
    name = 'AddPhotoUrlColumToTask1739104898730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "photo" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "photo"`);
    }

}
