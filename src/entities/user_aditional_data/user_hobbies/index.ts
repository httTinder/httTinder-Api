import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userAdditionalData } from "../index";

@Entity("user_hobbies")
export class userHobbies {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @ManyToOne(
    () => userAdditionalData,
    (userAddData) => userAddData.hobbies
  )
  userAdditionalData: userAdditionalData;
}
