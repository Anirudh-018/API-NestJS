import { Post,Get,Controller, Body ,Param,ParseIntPipe,Patch,Delete, HttpException, HttpStatus} from '@nestjs/common';
import { CreateStudentDto,UpdateStudentDto } from './dto/student.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private studentService:StudentService){}
    @Post()
    createStudent(@Body() createStudent:CreateStudentDto){
        this.studentService.createStudent(createStudent);
        throw new HttpException('ok', HttpStatus.ACCEPTED);
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
    }
    @Delete(':id')
    async deleteStudentById(@Param('id',ParseIntPipe) id:number){
        this.studentService.deleteStudent(id)
    }

}
