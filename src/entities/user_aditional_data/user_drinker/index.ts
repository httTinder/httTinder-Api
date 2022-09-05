import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user_drinker")
export class userDrinker {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    status: boolean
}