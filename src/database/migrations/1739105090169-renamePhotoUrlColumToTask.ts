import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamePhotoUrlColumToTask1739105090169 implements MigrationInterface {
    name = 'RenamePhotoUrlColumToTask1739105090169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "photo" TO "url_photo"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" RENAME COLUMN "url_photo" TO "photo"`);
    }

}
