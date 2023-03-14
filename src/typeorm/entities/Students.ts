import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'students'})
export class Student{
    @PrimaryGeneratedColumn({type:'bigint'})
    id:number
    @Column()
    name:string
    @Column()
    department:string
    @Column()
    createdAt:Date
    @Column()
    updatedAt:Date
}
