import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('looking_for')
export class lookingFor {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string

	@Column({ nullable: true })
	age: string

	@Column({ nullable: true })
	gender: string

	@Column({ nullable: true })
	zodiac: string

	@Column({ nullable: true })
	location: string

	@Column({ nullable: true })
	kids: boolean

	@Column({ nullable: true })
	smoker: boolean

	@Column({ nullable: true })
	pets: boolean

	@Column({ nullable: true })
	education: string
}
