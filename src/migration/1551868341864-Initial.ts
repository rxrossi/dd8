import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1551868341864 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "service" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "value" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "professional" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "percentage" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "sale" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "value" integer NOT NULL, "discount" integer NOT NULL, "notes" varchar NOT NULL, "clientId" integer, "professionalId" integer, "serviceId" integer)`);
        await queryRunner.query(`CREATE TABLE "client" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_sale" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "value" integer NOT NULL, "discount" integer NOT NULL, "notes" varchar NOT NULL, "clientId" integer, "professionalId" integer, "serviceId" integer, CONSTRAINT "FK_1f170accf5236a71106a84ed97b" FOREIGN KEY ("clientId") REFERENCES "client" ("id"), CONSTRAINT "FK_3085e6d8b0a1c787605573a10c7" FOREIGN KEY ("professionalId") REFERENCES "professional" ("id"), CONSTRAINT "FK_67f9322488dd88eb95059c34f20" FOREIGN KEY ("serviceId") REFERENCES "service" ("id"))`);
        await queryRunner.query(`INSERT INTO "temporary_sale"("id", "date", "value", "discount", "notes", "clientId", "professionalId", "serviceId") SELECT "id", "date", "value", "discount", "notes", "clientId", "professionalId", "serviceId" FROM "sale"`);
        await queryRunner.query(`DROP TABLE "sale"`);
        await queryRunner.query(`ALTER TABLE "temporary_sale" RENAME TO "sale"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "sale" RENAME TO "temporary_sale"`);
        await queryRunner.query(`CREATE TABLE "sale" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "value" integer NOT NULL, "discount" integer NOT NULL, "notes" varchar NOT NULL, "clientId" integer, "professionalId" integer, "serviceId" integer)`);
        await queryRunner.query(`INSERT INTO "sale"("id", "date", "value", "discount", "notes", "clientId", "professionalId", "serviceId") SELECT "id", "date", "value", "discount", "notes", "clientId", "professionalId", "serviceId" FROM "temporary_sale"`);
        await queryRunner.query(`DROP TABLE "temporary_sale"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "sale"`);
        await queryRunner.query(`DROP TABLE "professional"`);
        await queryRunner.query(`DROP TABLE "service"`);
    }

}
