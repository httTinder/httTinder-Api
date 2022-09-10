import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { userHobbies } from "./user_hobbies";
import { userLanguages } from "./user_languages";
import { userMusicGenre } from "./user_music_genre";
import { userPets } from "./user_pets";

@Entity("user_aditional_data")
export class userAdditionalData {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ nullable: true })
  zodiac: string;

  @Column({ nullable: true })
  drinker: boolean;

  @Column({ nullable: true })
  smoker: boolean;

  @Column({ nullable: true })
  kids: boolean;

  @Column({ nullable: true })
  kidsQnt?: number;

  @OneToMany(() => userHobbies, (hobbies) => hobbies.userAdditionalData, {
    eager: true,
    nullable: true,
  })
  hobbies: userHobbies[];

  @OneToMany(() => userPets, (pets) => pets.userAdditionalData, {
    eager: true,
    nullable: true,
  })
  pets: userPets[];

  @OneToMany(
    () => userLanguages,
    (userLanguages) => userLanguages.userAdditionalData,
    {
      eager: true,
      nullable: true,
    }
  )
  userLanguages: userLanguages[];

  @OneToMany(
    () => userMusicGenre,
    (userMusicGenre) => userMusicGenre.userAdditionalData,
    { eager: true, nullable: true }
  )
  userMusicGenre: userMusicGenre[];
}
