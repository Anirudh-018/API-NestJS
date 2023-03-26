import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{logger:['error','warn','debug']});
  await app.listen(3000);//port inn which the server is run is 3000
  app.useGlobalPipes(new ValidationPipe()) //defines the validation for all the requests
}
bootstrap();
  