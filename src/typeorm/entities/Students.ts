import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'students'})
export class Student{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number
    @Column({default:null})
    name:string
    @Column({default:null})
    department:string
    @Column({default:null})
    age:number
    @Column({default:null})
    gpa:number
    @Column()
    createdAt:Date
}
