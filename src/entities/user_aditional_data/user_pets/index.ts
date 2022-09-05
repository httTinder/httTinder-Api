import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userAditionalData } from "..";

@Entity("user_pets")
export class userPets {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @ManyToOne(() => userAditionalData)
    userAditionalData:userAditionalData
}