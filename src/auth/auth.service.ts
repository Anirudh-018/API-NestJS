import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import {JwtService} from '@nestjs/jwt'
import { User } from 'src/typeorm/entities/User';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    private logger=new Logger();
    constructor(
        private jwtService:JwtService
    ){ }

    //this creates a token and then assigns the claims
    public getTokenForUser(user:User):string{
        const v=this.jwtService.sign({
            username:user.username,
            sub:user.id
        });
        return v;
    }
    
    async hashPwd(password:string):Promise<string>{
        return await bcrypt.hash(password,10);
    }

    async getData(value:any){
        return await this.jwtService.verifyAsync(value);
    }
}
