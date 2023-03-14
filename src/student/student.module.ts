import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/typeorm/entities/Students';

@Module({
  imports:[TypeOrmModule.forFeature([Student])],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
