//this is the defenition for the json objects to be passed in the api request for create(get)
//it is optional and if not assigned the value is assumed to be null
export class CreateStudentDto {
    name: string;
    department: string;
    age: number;
    gpa: number;
    registrationDate: Date;
    attendance: Date;
    createdAt: Date;
    modifiedAt: Date;
}
//this is the defenition for the json objects to be passed in the api request for update(patch)
//the return type of update is also referes as this class only
export class UpdateStudentDto {
    name: string;
    department: string;
    age: number;
    gpa: number;
    createdAt: Date;
    modifiedAt: Date;
}

export class UserDto{
    name:string;
    id:number;
    username:string;
    firstName:string;
    lastName:string;
    password:string;
}