import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { lookingFor } from './looking_for'
import { typeOfRelationship } from './type_of_relationship'
import { userImages } from './user_images'

@Entity('user_profile')
export class userProfile {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string

	@Column()
	sexualOrientatio: boolean

	@Column()
	gender: string

	@Column({ length: 280 })
	bio: string

	@Column({ type: 'decimal', precision: 2, scale: 2 })
	height: number

	@Column()
	profileImage: string

	@Column()
	education: string

	@Column()
	profession: string

	@OneToOne(() => lookingFor, { eager: true, nullable: true })
	@JoinColumn()
	lookingFor: lookingFor

	@OneToOne(() => typeOfRelationship, { eager: true, nullable: true })
	@JoinColumn()
	typeOfRelationship: typeOfRelationship

	@OneToMany(() => userImages, (images) => images.userProfile, {
		eager: true,
		nullable: true,
	})
	profileImages: userImages[]
}
