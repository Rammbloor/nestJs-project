import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommentsMigration1739463251163 implements MigrationInterface {
  name = 'CommentsMigration1739463251163';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "owner_id" uuid NOT NULL, "task_id" uuid NOT NULL, "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "parent_comment_id" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "is_completed"`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "assignee_id" uuid`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "deadline" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "status" character varying NOT NULL DEFAULT 'OPEN'`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "size" character varying NOT NULL DEFAULT 'S'`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_91256732111f039be6b212d96cd" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_ac69bddf8202b7c0752d9dc8f32" FOREIGN KEY ("parent_comment_id") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_f2ff23694f0736c3192d9aa4a7f" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD CONSTRAINT "FK_855d484825b715c545349212c7f" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_855d484825b715c545349212c7f"`);
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_f2ff23694f0736c3192d9aa4a7f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_ac69bddf8202b7c0752d9dc8f32"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_91256732111f039be6b212d96cd"`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "size"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "deadline"`);
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "assignee_id"`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "is_completed" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
