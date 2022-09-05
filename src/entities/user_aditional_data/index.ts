import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { userDrinker } from "./user_drinker";
import { userHobbies } from "./user_hobbies";
import { userKids } from "./user_kids";
import { userLanguages } from "./user_languages";
import { userMusicGenre } from "./user_music_genre";
import { userPets } from "./user_pets";
import { userSmoker } from "./user_smoker";
import { userZodiacSign } from "./user_zodiac_sign";

@Entity("user_aditional_data")
export class userAditionalData {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @OneToOne(() => userDrinker, { eager: true, nullable: true })
    @JoinColumn()
    userDrinker: userDrinker

    @OneToMany(() => userHobbies, (hobbies) => hobbies.userAditionalData, { eager:true, nullable:true})
    hobbies: userHobbies[]

    @OneToOne(() => userKids, { eager:true, nullable:true})
    @JoinColumn()
    kids: userKids

    @OneToMany(() => userLanguages, (languages) => languages.userAditionalData, { eager:true, nullable:true})
    languages: userLanguages[]

    @OneToMany(() => userMusicGenre, (musicGenre) => musicGenre.userAditionalData, { eager:true, nullable:true})
    musicGenre: userMusicGenre[]

    @OneToMany(() => userPets, (pets) => pets.userAditionalData, { eager:true, nullable:true})
    pets: userPets[]

    @OneToOne(() => userSmoker, { eager:true, nullable:true})
    @JoinColumn()
    smoker: userSmoker

    @OneToOne(() => userZodiacSign, { eager:true, nullable:true})
    @JoinColumn()
    zodiac: userZodiacSign
}