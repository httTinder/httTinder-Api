import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { lookingFor } from "./looking_for";
import { typeOfRelationship } from "./type_of_relationship";
import { userImages } from "./user_images";

@Entity("user_profile")
export class userProfile {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: true })
  orientation: string;

  @Column({ nullable: true })
  gender: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  height: string;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  profession: string;

  @Column({ nullable: true })
  profileImage: string;

  @OneToOne(() => typeOfRelationship, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  typeOfRelationship: typeOfRelationship;

  @OneToOne(() => lookingFor, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  lookingFor: lookingFor;

  @OneToMany(() => userImages, (images) => images.userProfile, {
    eager: true,
    nullable: true,
  })
  images: userImages;
}
