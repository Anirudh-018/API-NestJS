import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { Student } from './typeorm/entities/Students';

//this is the main module for the server
//app module imports the sql class to degine the database and its porperties 
//it also imports student module which in turns is the functionality fo rthe server
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number (process.env.PORT),
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Student],
      synchronize: true
    }),
    StudentModule
  ],
})
export class AppModule { }