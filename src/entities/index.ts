import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { userAddresse } from "./user_address";
import { userAditionalData } from "./user_aditional_data";
import { userProfile } from "./user_profile";

@Entity("user")
export class user {
    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column({length:280})
    @Exclude()
    password: string

    @Column()
    age: number

    @Column({default:true})
    isActive: boolean 

    @Column({default:false})
    isAdm: boolean

    @CreateDateColumn()
    createdAt:Date

    @UpdateDateColumn()
    updatedAt:Date

    @OneToOne(() => userAddresse, { eager:true, nullable:true})
    @JoinColumn()
    address: userAddresse

    @OneToOne(() => userProfile, { eager:true, nullable:true})
    @JoinColumn()
    profile: userProfile

    @OneToOne(() => userAditionalData, { eager:true, nullable:true})
    @JoinColumn()
    userAditionalData: userAditionalData
}   