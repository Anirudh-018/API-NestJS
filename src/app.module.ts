import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { Student } from './typeorm/entities/Students';

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
export class AppModule {}