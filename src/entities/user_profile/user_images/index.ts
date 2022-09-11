import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userProfile } from "../index";

@Entity("user_images")
export class userImages {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  link: string;

  @Column()
  width: string;

  @Column()
  height: string;

  @ManyToOne(() => userProfile, {
    onDelete: "SET NULL",
  })
  userProfile: userProfile;
}
