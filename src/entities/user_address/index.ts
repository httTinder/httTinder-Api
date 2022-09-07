import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Max, Min } from "class-validator"

@Entity("addresses")
export class userAddresses {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    country: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    @Min(10000000)
    @Max(99999999)
    zipCode: string

    @Column()
    distict: string
}