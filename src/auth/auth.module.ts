import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/typeorm/entities/User";
import { LocalStartegy } from "./local.strategy";
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from './auth.service';
import { JwtStrategy } from "./jwt.strategy";
import { UserController } from "./users.controller";
import { StudentService } from "src/student/student.service";
import { Student } from "src/typeorm/entities/Students";
import { Parent } from "src/typeorm/entities/Parent";

@Module({
    imports:[
    TypeOrmModule.forFeature([User,Student,Parent]),
    JwtModule.registerAsync({
        useFactory:()=>({
            secret:process.env.SECRET_TEXT,
            signOptions:{
                expiresIn:'60m'
            }
        })
    })   
],
    providers:[LocalStartegy,JwtStrategy, AuthService,StudentService],
    controllers: [UserController,AuthController]
})
export class AuthModule{ }