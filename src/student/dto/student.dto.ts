import {IsNotEmpty,IsNumber,IsString,IsDate} from 'class-validator'; 
export class CreateStudentDto{
    @IsNotEmpty()
    id:number
    @IsString()
    name:string;
    @IsString()
    department:string;
    @IsNumber()
    age:number;
    @IsNumber()
    gpa:number;
    @IsDate()
    createdAt:Date;
    @IsDate()
    modifiedAt:Date;
}
export class UpdateStudentDto{
    @IsNotEmpty()
    id:number
    @IsString()
    name:string;
    @IsString()
    department:string;
    @IsNumber()
    age:number;
    @IsNumber()
    gpa:number;
    @IsDate()
    createdAt:Date;
    @IsDate()
    modifiedAt:Date;
}