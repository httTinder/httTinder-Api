import { Exclude } from "class-transformer";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Min } from "class-validator";
import { userAddresses } from "./user_address";
import { userAditionalData } from "./user_aditional_data";
import { userProfile } from "./user_profile/index";

@Entity("user")
export class user {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Min(18)
  age: number;

  @Column({ default: false })
  isActive?: boolean;

  @Column({ default: false })
  isAdm?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => userAddresses, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  address: userAddresses;

  @OneToOne(() => userProfile, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  profile: userProfile;

  @OneToOne(() => userAditionalData, {
    eager: true,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn()
  userAditionalData: userAditionalData;
}
