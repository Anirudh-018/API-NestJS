import { Injectable, Logger } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy } from 'passport-local';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"

@Injectable()
export class LocalStartegy extends PassportStrategy(Strategy,){ 
    private logger=new Logger(LocalStartegy.name);
    constructor(
        @InjectRepository(User)
         private userRepository:Repository<User>
    ){
        super();
    }
    async validate(username:string,password: string):Promise<any>{
        const user=await this.userRepository.findOne({
            where:{username}
        })
        if(!user){
            this.logger.debug(`user ${username} not found!`);
            throw new UnauthorizedException();
        }

        if(!(await bcrypt.compare(password,user.password))){
            this.logger.debug(`invalid`);
            throw new UnauthorizedException();
        }

        else
            return user;
    }
}