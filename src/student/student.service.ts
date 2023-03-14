import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/typeorm/entities/Students';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/student.dto';

@Injectable()
export class StudentService {
    constructor(@InjectRepository(Student) private studentRepository:Repository<Student>){}
    createStudent(studentDetails: CreateStudentDto){
        const newstudent=this.studentRepository.create({...studentDetails,createdAt:new Date()});
        // console.log(typeof(newstudent));
        return this.studentRepository.save(newstudent);
    }
}
