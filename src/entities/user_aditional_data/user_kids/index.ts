import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user_kids")
export class userKids {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    status: boolean

    @Column()
    quantity: string
}