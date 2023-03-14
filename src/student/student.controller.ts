import { Post,Get,Controller, Body ,Param,ParseIntPipe,Patch,Delete} from '@nestjs/common';
import { Student } from 'src/typeorm/entities/Students';
import { CreateStudentDto,UpdateStudentDto } from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private studentService:StudentService){}
    // createStudent(@Body()createStudentDto: CreateStudentDto) {
        //     const newStu = await this.studentService.createStudent(student);
        //     //return response.status(HttpStatus.CREATED);
        //     return this.studentService.createStudent(createStudentDto)
        // }
    @Post()
    createStudent(@Body() createStudent:CreateStudentDto){
        this.studentService.createStudent(createStudent);
        return createStudent;
    }
    @Get(':id')
    async fetchStudents(@Param('id',ParseIntPipe) id:number){
        const students=await this.studentService.fetchStudents({id});
        return students;
    }
    @Patch(':id')
    async updateStudentById(@Param('id',ParseIntPipe) id:number,
    @Body() updateStudentDto:UpdateStudentDto){
        await this.studentService.updateStudent(id,updateStudentDto);
        // return this.studentService.fetchStudents({id})
    }
    @Delete(':id')
    deleteStudentById(@Param('id',ParseIntPipe) id:number){
        this.studentService.deleteStudent(id)
    }

}
