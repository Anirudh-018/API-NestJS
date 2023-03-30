import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./Profile";
import { Student } from "./Students";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({unique:true})
    username:string;
    @Column({unique:true})
    password:string;
    @Column()
    email:string;
    @Column()
    firstName:string;
    @Column()
    lastName:string;

    @OneToOne(()=>Profile)
    @JoinColumn()
    profile:Profile

    @OneToMany(()=>Student,(student)=>student.authorizer)
    authorized:Student[];
}