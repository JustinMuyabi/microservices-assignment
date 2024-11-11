import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Transport} from "@nestjs/microservices";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3001,
    }
  })
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().then(() => console.log('Auth server started'));
