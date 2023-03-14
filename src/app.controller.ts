import { Controller, Get,Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(@Body() dto:any){
    console.log({dto:dto})
    return this.appService.getHello();
  }
}
