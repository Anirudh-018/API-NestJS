import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt,Strategy } from "passport-jwt";
import { User } from "src/typeorm/entities/User";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwtGate'){
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>,
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey:process.env.SECRET_TEXT,
        })
    }

    async validate(payload:any){
        console.log(payload);
        return await this.userRepository.find(payload.sub);
    }
}