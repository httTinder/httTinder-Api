import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userAdditionalData } from "../index";

@Entity("user_languages")
export class userLanguages {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  language: string;

  @ManyToOne(() => userAdditionalData, (userAddData) => userAddData.userLanguages)
  userAdditionalData: userAdditionalData;
}
