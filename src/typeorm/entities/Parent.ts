import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "./Students";

@Entity()
export class Parent{
    @PrimaryGeneratedColumn()
    id:Number;
    @Column()
    name:string;
    @ManyToOne(()=>Student,(child)=>child.parents,{nullable:false})
    @JoinColumn()
    child:Student;
}