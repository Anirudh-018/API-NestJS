import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/typeorm/entities/Students';
import { Repository } from 'typeorm';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository:Repository<Student>){}
    // createStudent(createStudentDto:CreateStudentDto){
    //     return createStudentDto;
    // }
    fetchStudents(id):Promise<Student>{
        return this.studentRepository.findOneBy({id});
    }
    createStudent(createStudentDetails:CreateStudentDto){
        const newStudent=this.studentRepository.create({
            ...createStudentDetails,createdAt:new Date(),
        });
        return this.studentRepository.save(newStudent);
    }
    updateStudent(id:number,updateStudentData:UpdateStudentDto){
        if(updateStudentData){
        return this.studentRepository.update({id},{...updateStudentData,modifiedAt:new Date()});
        // return this.studentRepository.findOneBy({id});
        // this.studentRepository.findOneBy({id});
        }
        else{
            this.studentRepository.update({id},{...updateStudentData,modifiedAt:null});
        }
    }
    deleteStudent(id:number){
        return this.studentRepository.delete({id});
    }
}
