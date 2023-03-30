import { Controller,Post,Body} from '@nestjs/common'
import { User } from 'src/typeorm/entities/User';
import { AuthService } from './auth.service';
import { CreateUserDto } from './input/user.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Controller('users')
export class UserController{
    constructor(
        private authService:AuthService,
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    @Post()
    async create(@Body() createUserDto:CreateUserDto){

        if(createUserDto.password!==createUserDto.retypedPassword){
            throw new BadRequestException(['password does not match']);
        }

        const existing=await this.userRepository.findOne({
            where:[
                {username:createUserDto.username},
                {email:createUserDto.email}
            ]
        })
        if(existing){
            console.log("existing");
            throw new BadRequestException(['existing username or user']);       
        }
        createUserDto.password=await this.authService.hashPwd(createUserDto.password)
        const user=this.userRepository.create({
            ...createUserDto,
        })
        return{
            ...(await this.userRepository.save(user))
        }
    }

}