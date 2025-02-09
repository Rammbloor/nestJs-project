import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1739135293284 implements MigrationInterface {
    name = 'Initial1739135293284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "owner_id" uuid NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "is_completed" boolean NOT NULL DEFAULT false, "url_file" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "project_id" uuid NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "is_completed" boolean NOT NULL DEFAULT false, "url_file" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "role" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_ace513fa30d485cfd25c11a9e4a" UNIQUE ("role"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_d40afe32d1d771bea7a5f468185" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_9eecdb5b1ed8c7c2a1b392c28d4" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_db55af84c226af9dce09487b61b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_db55af84c226af9dce09487b61b"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_9eecdb5b1ed8c7c2a1b392c28d4"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_d40afe32d1d771bea7a5f468185"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
