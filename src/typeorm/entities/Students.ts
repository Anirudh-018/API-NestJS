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
    @Column({type:'float',default:null})
    gpa:number
    @Column({default:null})
    createdAt:Date
    @Column({default:null})
    modifiedAt:Date
}
