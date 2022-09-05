import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user_zodiac_sign")
export class userZodiacSign {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    zodiac: string
}