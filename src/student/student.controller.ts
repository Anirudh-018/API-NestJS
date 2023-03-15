import { Post,Get,Controller, Body ,Param,ParseIntPipe,Patch,Delete, HttpException, HttpStatus,Req,Res,UsePipes} from '@nestjs/common';
import { CreateStudentDto,UpdateStudentDto } from './dto/student.dto';
import { StudentService } from './student.service';
import { Response,Request } from 'express';
import { mergeSortScore,mergeSortRegId } from './student.helperSort';
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

    @Get('/fetch/:id')
    async fetchStudents(
        @Param('id',ParseIntPipe) id:number,
        @Res() res: Response
        )
        {
            const students=await this.studentService.fetchStudents(id);
            if(students){
                const status=HttpStatus.OK+" found";
                res.send({status,students})
            }
            else{
                throw new HttpException("empty",HttpStatus.BAD_REQUEST);
            }
        }
    @Get()
    async fetchAllStudents(){
        return await this.studentService.fetchAllStudents();
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
    @Get('weighted_score')
    async fetchAllWeightedScore(){
        const a=mergeSortScore(await this.studentService.fetchAllStudents());
        return a
    }
    @Get('registration_date')
    async fetchAllRegistrationId(){
        const a=mergeSortRegId(await this.studentService.fetchAllStudents());
        return a;
    }
}
