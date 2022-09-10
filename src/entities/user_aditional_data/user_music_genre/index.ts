import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userAdditionalData } from "../index";

@Entity("user_music_genre")
export class userMusicGenre {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @ManyToOne(
    () => userAdditionalData,
    (userAddData) => userAddData.userMusicGenre
  )
  userAdditionalData: userAdditionalData;
}
