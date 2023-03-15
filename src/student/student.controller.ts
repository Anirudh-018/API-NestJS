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
            const status=HttpStatus.CREATED+" Created";
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
        )
        {
            const students=await this.studentService.fetchStudents({id});
            if(students){
                const status=HttpStatus.OK+" found";
                res.send({status,students})
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
    @Body() updateStudentDto:UpdateStudentDto,@Res() res:Response){
        const stud=await this.studentService.updateStudent(id,updateStudentDto);
        const status=HttpStatus.OK+" updated";
        res.send({status,stud});
        return stud;
    }

    @Delete(':id')
    async deleteStudentById(@Param('id',ParseIntPipe) id:number,@Res() res:Response){
        const deleteResponse=await this.studentService.deleteStudent(id)
        if(deleteResponse){
            const status=HttpStatus.NO_CONTENT+" no content";
            res.send({status,deleteResponse})
        }
        else{
            res.send(HttpStatus.NOT_FOUND+" not found");
        }
    }
}
