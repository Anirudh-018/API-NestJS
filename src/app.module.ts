import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { Student } from './typeorm/entities/Students';

//this is the main module for the server
//app module imports the sql class to degine the database and its porperties 
//it also imports student module which in turns is the functionality fo rthe server
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sairam123',
      database: 'student',
      entities: [Student],
      synchronize: true
    }),
    StudentModule
  ],
})
export class AppModule { }