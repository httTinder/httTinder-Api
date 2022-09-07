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
	sexualOrientatio: string

	@Column()
	gender: string

	@Column( )
	bio: string

	@Column({ type: 'decimal', precision: 2, scale: 2 })
	height: number

	@Column({length: 28})
	education: string

	@Column({length: 46})
	profession: string

	@Column()
	profileImage: string

	@OneToOne(() => typeOfRelationship, { eager: true, nullable: true })
	@JoinColumn()
	typeOfRelationship: typeOfRelationship 

	@OneToOne(() => lookingFor, { eager: true, nullable: true })
	@JoinColumn()
	lookingFor: lookingFor

	@OneToMany(() => userImages, (images) => images.userProfile, {
		eager: true,
		nullable: true,
	})
	images: userImages[]
}
