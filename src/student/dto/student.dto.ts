import {IsNotEmpty,IsNumber,IsString,IsDate} from 'class-validator'; 
export class CreateStudentDto{
    name:string;
    department:string;
    age:number;
    gpa:number;
    registrationDate:Date;
    attendance:Date;
    createdAt:Date;
    modifiedAt:Date;
}
export class UpdateStudentDto{
    name:string;
    department:string;
    age:number;
    gpa:number;
    createdAt:Date;
    modifiedAt:Date;
}