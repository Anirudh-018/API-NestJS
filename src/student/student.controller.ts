import { Post,Get,Controller, Body } from '@nestjs/common';
import { CreateStudentDto } from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private studentService:StudentService){}
    @Post()
    create(@Body() createStudentDto:CreateStudentDto){
        this.studentService.createStudent(createStudentDto);
    }
}
