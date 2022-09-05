import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userAditionalData } from "../index";

@Entity("user_languages")
export class userLanguages {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    language: string

    @ManyToOne(() => userAditionalData)
    userAditionalData:userAditionalData
}