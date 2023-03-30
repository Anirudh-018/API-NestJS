import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { Parent } from './typeorm/entities/Parent';
import { Profile } from './typeorm/entities/Profile';
import { Student } from './typeorm/entities/Students';
import { User } from './typeorm/entities/User';

//this is the main module for the server
//app module imports the sql class to degine the database and its porperties 
//it also imports student module which in turns is the functionality fo rthe server
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: 'root',
      password: 'sairam123',
      database: 'student',
      entities: [Student,Parent,Profile,User],
      synchronize: true
    }),
    StudentModule,AuthModule
  ],
})
export class AppModule { }