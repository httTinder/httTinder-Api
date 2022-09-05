import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("type_of_relationship")
export class typeOfRelationship {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column({default:false})
    friendship: boolean

    @Column({default:false})
    casual: boolean

    @Column({default:false})
    serious: boolean
}