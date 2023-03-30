import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger:['error','warn','debug']});
  app.useGlobalPipes(new ValidationPipe()) //defines the validation for all the requests
  app.use(cookieParser())
  app.enableCors({
    origin:"http://localhost:3000",
    credentials:true
  })
  await app.listen(3000);//port inn which the server is run is 3000
}
bootstrap();
  