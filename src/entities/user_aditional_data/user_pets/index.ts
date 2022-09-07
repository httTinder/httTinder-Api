import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userAditionalData } from "../index";

@Entity("user_pets")
export class userPets {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    specie: string

    @ManyToOne(() => userAditionalData)
    userAditionalData:userAditionalData
}