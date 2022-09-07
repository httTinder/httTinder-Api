import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { userHobbies } from './user_hobbies'
import { userLanguages } from './user_languages'
import { userMusicGenre } from './user_music_genre'
import { userPets } from './user_pets'

@Entity('user_aditional_data')
export class userAditionalData {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string

	@Column({ nullable: true })
	zodiac: string

	@Column({ nullable: true })
	drinker: boolean

	@Column({ nullable: true })
	smoker: boolean

	@Column({ nullable: true })
	kids: boolean

	@Column({ nullable: true })
	kidsQnt: number

	@OneToMany(() => userHobbies, (hobbies) => hobbies.userAditionalData, {
		eager: true,
		nullable: true,
	})
	hobbies: userHobbies[]

	@OneToMany(() => userPets, (pets) => pets.userAditionalData, {
		eager: true,
		nullable: true,
	})
	pets: userPets[]

	@OneToMany(
		() => userLanguages,
		(languages) => languages.userAditionalData,
		{ eager: true, nullable: true }
	) 
	languages: userLanguages[]

	@OneToMany(
		() => userMusicGenre,
		(musicGenre) => musicGenre.userAditionalData,
		{ eager: true, nullable: true }
	)
	musicGenre: userMusicGenre[]
}
