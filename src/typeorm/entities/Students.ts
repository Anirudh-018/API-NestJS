import { Column, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";

//defines the database schema i.e the different columns, their data types and the constrains
//used to refer to all the returned records in response and the input parameters in the request
@Entity({ name: 'students' })
export class Student {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number
    @Column({ default: null })
    name: string
    @Column({ default: null })
    department: string
    @Column({ default: null })
    age: number
    @Column({ type: 'float', default: null })
    gpa: number
    @Column({ default: null })
    registrationDate: Date
    @Column({ type: 'float', default: null })
    attendance
    @Column({ default: null })
    createdAt: Date
    @Column({ default: null })
    modifiedAt: Date
}
