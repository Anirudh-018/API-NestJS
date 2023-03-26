//important imports
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//invokes the student entity
import { Student } from 'src/typeorm/entities/Students';
import { Repository } from 'typeorm';

//invokes the dtos to be used
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
@Injectable()
export class StudentService {
    private readonly logger =new Logger(StudentService.name);
    // uses the repository class in the typeorm to use the different typeorm methods and it is injected as a dependancy in the students service
    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) {}
    //the methods in the studentRepository object simplies out db operations

    //method to fetch the students by id as a search parameter
    async fetchStudents(id): Promise<Student> {
        this.logger.log("hit the fetch students by id");
        if (await this.studentRepository.countBy({ id }) > 0) {
            this.logger.debug("found");
            return this.studentRepository.findOneBy({ id });
        }
        else {
            this.logger.error("not found")
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
            //the cureatd and modified dates is set to current date.
            ...createStudentDetails, createdAt: new Date(), modifiedAt: new Date()
        });
        //the save is used to commit the changes to the db 
        this.studentRepository.save(newStudent);
        return newStudent;
    }

    //method to update student records base on student id
    //input parameters are the update JSON object 
    //returns the updated student record
    async updateStudent(id: number, updateStudentData: UpdateStudentDto) {
        //await is used here to expect asynchronous returns and countBy returns the no of rows present in the db matching the id
        if (await this.studentRepository.countBy({ id }) > 0) {
            let row = await this.studentRepository.findOneBy({ id });
            //the save commits the changes to the DB
            await this.studentRepository.save({ ...row, ...updateStudentData,modifiedAt:new Date() });
            //this is used to return the updated record in db
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
            //delete removes the record in DB
            this.studentRepository.delete({ id });
            return 1;
        }
        else {
            return 0;
        }
    }
}
