import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { userAditionalData } from "..";

@Entity("user_music_genre")
export class userMusicGenre {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @ManyToOne(() => userAditionalData)
    userAditionalData:userAditionalData
}