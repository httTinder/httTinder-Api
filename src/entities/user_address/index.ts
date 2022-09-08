import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Max, Min } from "class-validator";

@Entity("user_addresses")
export class userAddresses {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column()
  distict: string;
}
