import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/typeorm/entities/Students';
import { Repository } from 'typeorm';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository:Repository<Student>){}
    async fetchStudents(id):Promise<Student>{
        if(await this.studentRepository.countBy({id})>0){
            return this.studentRepository.findOneBy({id});
        }
        else{
            throw new HttpException("Record not found",HttpStatus.BAD_REQUEST);
        }
    }
    fetchAllStudents():Promise<Student[]>{
        return this.studentRepository.find();
    }
    createStudent(createStudentDetails:CreateStudentDto){
        const newStudent=this.studentRepository.create({
            ...createStudentDetails,createdAt:new Date(),modifiedAt:new Date()
        });
        this.studentRepository.save(newStudent);
        return newStudent;
    }
    async updateStudent(id:number,updateStudentData:UpdateStudentDto){
        if(await this.studentRepository.countBy({id})>0){
            let row=await this.studentRepository.findOneBy({id});
            return this.studentRepository.save({...row,...updateStudentData});
        }
        else{
            throw new HttpException('no such row found', HttpStatus.FORBIDDEN);

        }
    }
    async deleteStudent(id:number){
        if(await this.studentRepository.countBy({id})>0){
            this.studentRepository.delete({id});
            return null
        }
        else{
            throw new HttpException('no such row found', HttpStatus.FORBIDDEN);
        }
    }
}
