import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1662786999913 implements MigrationInterface {
    name = 'createTables1662786999913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "country" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "zipCode" character varying(8) NOT NULL, "distict" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_hobbies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userAdditionalDataId" uuid, CONSTRAINT "PK_9f4b5afa1d2484defd6f24d1032" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_languages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "language" character varying NOT NULL, "userAdditionalDataId" uuid, CONSTRAINT "PK_a98f4f961abaede9204f3b1dc7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_music_genre" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userAdditionalDataId" uuid, CONSTRAINT "PK_7a24ffca45e3054b263691bbf39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_pets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "specie" character varying NOT NULL, "userAdditionalDataId" uuid, CONSTRAINT "PK_d5ac897e721b2d20e32683839c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_aditional_data" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zodiac" character varying, "drinker" boolean, "smoker" boolean, "kids" boolean, "kidsQnt" integer, CONSTRAINT "PK_8a8f6950d400199529c073f7b7b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "looking_for" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "age" character varying, "gender" character varying, "zodiac" character varying, "location" character varying, "kids" boolean DEFAULT false, "smoker" boolean DEFAULT false, "drinker" boolean DEFAULT false, "pets" boolean DEFAULT false, "education" character varying, CONSTRAINT "PK_5a6eb31f8a744fc8c5ee42ffcde" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type_of_relationship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "friendship" boolean NOT NULL DEFAULT false, "casual" boolean NOT NULL DEFAULT false, "serious" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e5bf8fd6ffbfbde182aa4cb8876" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "link" character varying NOT NULL, "width" character varying NOT NULL, "height" character varying NOT NULL, "userProfileId" uuid, CONSTRAINT "PK_8c5d93e1b746bef23c0cf9aa3a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orientation" character varying, "gender" character varying, "bio" character varying, "height" character varying, "education" character varying(28), "profession" character varying(46), "profileImage" character varying, "typeOfRelationshipId" uuid, "lookingForId" uuid, CONSTRAINT "REL_a3cf2b2cdb20377a60f316171d" UNIQUE ("typeOfRelationshipId"), CONSTRAINT "REL_e8ed974bd3abb351d9f6b2d78a" UNIQUE ("lookingForId"), CONSTRAINT "PK_f44d0cd18cfd80b0fed7806c3b7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "age" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "isAdm" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, "profileId" uuid, "userAdditionalDataId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_217ba147c5de6c107f2fa7fa27" UNIQUE ("addressId"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "REL_34a6ac21ab3c1036f30856e761" UNIQUE ("userAdditionalDataId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_hobbies" ADD CONSTRAINT "FK_e6653af704a8011ca287bbb1d1d" FOREIGN KEY ("userAdditionalDataId") REFERENCES "user_aditional_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_languages" ADD CONSTRAINT "FK_2148421d92aebdd5e97b0a46dd7" FOREIGN KEY ("userAdditionalDataId") REFERENCES "user_aditional_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_music_genre" ADD CONSTRAINT "FK_e00f378b32b1935918ac7e3f083" FOREIGN KEY ("userAdditionalDataId") REFERENCES "user_aditional_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_pets" ADD CONSTRAINT "FK_ec05570993b9e96ac886c6382cd" FOREIGN KEY ("userAdditionalDataId") REFERENCES "user_aditional_data"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_images" ADD CONSTRAINT "FK_42dc10ee00e99bb8bd02382892d" FOREIGN KEY ("userProfileId") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_a3cf2b2cdb20377a60f316171d8" FOREIGN KEY ("typeOfRelationshipId") REFERENCES "type_of_relationship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_profile" ADD CONSTRAINT "FK_e8ed974bd3abb351d9f6b2d78af" FOREIGN KEY ("lookingForId") REFERENCES "looking_for"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "user_profile"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_34a6ac21ab3c1036f30856e7619" FOREIGN KEY ("userAdditionalDataId") REFERENCES "user_aditional_data"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_34a6ac21ab3c1036f30856e7619"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_e8ed974bd3abb351d9f6b2d78af"`);
        await queryRunner.query(`ALTER TABLE "user_profile" DROP CONSTRAINT "FK_a3cf2b2cdb20377a60f316171d8"`);
        await queryRunner.query(`ALTER TABLE "user_images" DROP CONSTRAINT "FK_42dc10ee00e99bb8bd02382892d"`);
        await queryRunner.query(`ALTER TABLE "user_pets" DROP CONSTRAINT "FK_ec05570993b9e96ac886c6382cd"`);
        await queryRunner.query(`ALTER TABLE "user_music_genre" DROP CONSTRAINT "FK_e00f378b32b1935918ac7e3f083"`);
        await queryRunner.query(`ALTER TABLE "user_languages" DROP CONSTRAINT "FK_2148421d92aebdd5e97b0a46dd7"`);
        await queryRunner.query(`ALTER TABLE "user_hobbies" DROP CONSTRAINT "FK_e6653af704a8011ca287bbb1d1d"`);
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
