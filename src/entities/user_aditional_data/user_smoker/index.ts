import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user_smoker")
export class userSmoker {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    status: boolean
}