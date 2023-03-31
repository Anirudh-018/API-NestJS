import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/typeorm/entities/Students';
import { Parent } from 'src/typeorm/entities/Parent';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/typeorm/entities/User';
import { JwtService } from '@nestjs/jwt';

//this is he main student module which runs all the controllers and the services in the server
@Module({
  imports: [TypeOrmModule.forFeature([Student,Parent,User])],
  providers: [StudentService,AuthService,JwtService],
  controllers: [StudentController]
})
export class StudentModule { }
