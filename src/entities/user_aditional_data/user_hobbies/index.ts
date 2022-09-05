import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userAditionalData } from "../index";

@Entity("user_hobbies")
export class userHobbies {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @ManyToOne(() => userAditionalData)
    userAditionalData:userAditionalData
}