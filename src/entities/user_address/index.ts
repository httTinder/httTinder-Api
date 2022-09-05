import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("addresses")
export class userAddresse {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    country: string

    @Column()
    city: string

    @Column({nullable: true})
    state: string

    @Column()
    zipCode: string

    @Column()
    distict: string
}