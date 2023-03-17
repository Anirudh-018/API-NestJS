//important imports
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//invokes the student entity
import { Student } from 'src/typeorm/entities/Students';
import { Repository } from 'typeorm';

//invokes the dtos
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
@Injectable()
export class StudentService {
    
    // uses the repository class in the typeorm to use the different typeorm methods and it is injected as a dependancy in the students service
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) {}

    //method to fetch the students by id as a search parameter
    async fetchStudents(id): Promise<Student> {
        if (await this.studentRepository.countBy({ id }) > 0) {
            return this.studentRepository.findOneBy({ id });
        }
        else {
            throw new HttpException("Record not found", HttpStatus.BAD_REQUEST);
        }
    }

    //method to fetch all the student records as an array of student class objects
    fetchAllStudents(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    //method to create a student record in the database and to save it permanetly 
    //it returns a student object of inserted student
    createStudent(createStudentDetails: CreateStudentDto) {
        const newStudent = this.studentRepository.create({
            ...createStudentDetails, createdAt: new Date(), modifiedAt: new Date()
        });
        this.studentRepository.save(newStudent);
        return newStudent;
    }

    //method to update student records base on student id
    //input parameters are the update JSON object 
    //returns the updated student record
    async updateStudent(id: number, updateStudentData: UpdateStudentDto) {
        if (await this.studentRepository.countBy({ id }) > 0) {
            let row = await this.studentRepository.findOneBy({ id });
            await this.studentRepository.save({ ...row, ...updateStudentData,modifiedAt:new Date() });
            return await this.studentRepository.findOneBy({id})
        }
        else {
            throw new HttpException('no such row found', HttpStatus.FORBIDDEN);
        }
    }

    //method to delete the student baed on the input parameter id
    //return 1 if deleted or relse returns 0
    async deleteStudent(id: number) {
        if (await this.studentRepository.countBy({ id }) > 0) {
            this.studentRepository.delete({ id });
            return 1;
        }
        else {
            return 0;
        }
    }
}
