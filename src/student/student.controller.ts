import { Post,Get,Controller, Body ,Param,ParseIntPipe,Patch,Delete, HttpException, HttpStatus,Req,Res,UsePipes} from '@nestjs/common';
import { CreateStudentDto,UpdateStudentDto } from './dto/student.dto';
import { StudentService } from './student.service';
import { Response,Request } from 'express';
import { IsEmpty } from 'class-validator';
import { ValidationPipe } from '@nestjs/common/pipes';

@Controller('student')
export class StudentController {
    constructor(private studentService:StudentService){}
    @Post()
    createStudent(@Body() createStudent:CreateStudentDto,
    @Res() res: Response,){
        if(Object.keys(createStudent).length>0){
            const stud=this.studentService.createStudent(createStudent);
            const status=HttpStatus.OK+" created";
            res.send({status,stud})
        }
        else{
            res.status(400).send(HttpStatus.BAD_REQUEST+" Bad request")
        }
    }
    @Get(':id')
    async fetchStudents(
        @Param('id',ParseIntPipe) id:number,
        @Req() req:Request,
        @Res() res: Response,
        ){
            const students=await this.studentService.fetchStudents({id});
            if(students){
                res.status(200).send("created")
            }
            else{
                throw new HttpException("empty",HttpStatus.BAD_REQUEST);
            }
        }
    @Get()
    fetchAllStudents(){
        return this.studentService.fetchAllStudents();
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
