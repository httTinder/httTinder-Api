import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1662688870720 implements MigrationInterface {
    name = 'createTables1662688870720'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zipCode" character varying(8) NOT NULL, "distict" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_hobbies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userAditionalDataId" uuid, CONSTRAINT "PK_9f4b5afa1d2484defd6f24d1032" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_languages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language" character varying NOT NULL, "userAditionalDataId" uuid, CONSTRAINT "PK_a98f4f961abaede9204f3b1dc7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_music_genre" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userAditionalDataId" uuid, CONSTRAINT "PK_7a24ffca45e3054b263691bbf39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_pets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "specie" character varying NOT NULL, "userAditionalDataId" uuid, CONSTRAINT "PK_d5ac897e721b2d20e32683839c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_aditional_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zodiac" character varying, "drinker" boolean, "smoker" boolean, "kids" boolean, "kidsQnt" integer, CONSTRAINT "PK_8a8f6950d400199529c073f7b7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "looking_for" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "age" character varying, "gender" character varying, "zodiac" character varying, "location" character varying, "kids" boolean DEFAULT false, "smoker" boolean DEFAULT false, "drinker" boolean DEFAULT false, "pets" boolean DEFAULT false, "education" character varying, CONSTRAINT "PK_5a6eb31f8a744fc8c5ee42ffcde" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_of_relationship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "friendship" boolean NOT NULL DEFAULT false, "casual" boolean NOT NULL DEFAULT false, "serious" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e5bf8fd6ffbfbde182aa4cb8876" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "link" character varying NOT NULL, "width" character varying NOT NULL, "height" character varying NOT NULL, "userProfileId" uuid, CONSTRAINT "PK_8c5d93e1b746bef23c0cf9aa3a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sexualOrientatio" character varying, "gender" character varying, "bio" character varying, "height" numeric(2,2), "education" character varying(28), "profession" character varying(46), "profileImage" character varying, "typeOfRelationshipId" uuid, "lookingForId" uuid, CONSTRAINT "REL_a3cf2b2cdb20377a60f316171d" UNIQUE ("typeOfRelationshipId"), CONSTRAINT "REL_e8ed974bd3abb351d9f6b2d78a" UNIQUE ("lookingForId"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "isAdm" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "profileId" uuid, "userAditionalDataId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "REL_72f69dd8bc54c122d90774166c" UNIQUE ("userAditionalDataId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_hobbies" ADD CONSTRAINT "FK_6e3da2d705990aeefa568cb3354" FOREIGN KEY ("userAditionalDataId") REFERENCES "user_aditional_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_languages" ADD CONSTRAINT "FK_2446b45739820f19f981cebcf0f" FOREIGN KEY ("userAditionalDataId") REFERENCES "user_aditional_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_music_genre" ADD CONSTRAINT "FK_0cd834d6ba79ee47e4a9bbb413e" FOREIGN KEY ("userAditionalDataId") REFERENCES "user_aditional_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_pets" ADD CONSTRAINT "FK_b34409bfbaab0bdcc43960a45e1" FOREIGN KEY ("userAditionalDataId") REFERENCES "user_aditional_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_images" ADD CONSTRAINT "FK_42dc10ee00e99bb8bd02382892d" FOREIGN KEY ("userProfileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_a3cf2b2cdb20377a60f316171d8" FOREIGN KEY ("typeOfRelationshipId") REFERENCES "type_of_relationship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_e8ed974bd3abb351d9f6b2d78af" FOREIGN KEY ("lookingForId") REFERENCES "looking_for"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "user_profile"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_72f69dd8bc54c122d90774166c3" FOREIGN KEY ("userAditionalDataId") REFERENCES "user_aditional_data"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_72f69dd8bc54c122d90774166c3"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_e8ed974bd3abb351d9f6b2d78af"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_a3cf2b2cdb20377a60f316171d8"`);
        await queryRunner.query(`ALTER TABLE "user_images" DROP CONSTRAINT "FK_42dc10ee00e99bb8bd02382892d"`);
        await queryRunner.query(`ALTER TABLE "user_pets" DROP CONSTRAINT "FK_b34409bfbaab0bdcc43960a45e1"`);
        await queryRunner.query(`ALTER TABLE "user_music_genre" DROP CONSTRAINT "FK_0cd834d6ba79ee47e4a9bbb413e"`);
        await queryRunner.query(`ALTER TABLE "user_languages" DROP CONSTRAINT "FK_2446b45739820f19f981cebcf0f"`);
        await queryRunner.query(`ALTER TABLE "user_hobbies" DROP CONSTRAINT "FK_6e3da2d705990aeefa568cb3354"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
        await queryRunner.query(`DROP TABLE "user_images"`);
        await queryRunner.query(`DROP TABLE "type_of_relationship"`);
        await queryRunner.query(`DROP TABLE "looking_for"`);
        await queryRunner.query(`DROP TABLE "user_aditional_data"`);
        await queryRunner.query(`DROP TABLE "user_pets"`);
        await queryRunner.query(`DROP TABLE "user_music_genre"`);
        await queryRunner.query(`DROP TABLE "user_languages"`);
        await queryRunner.query(`DROP TABLE "user_hobbies"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
