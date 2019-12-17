import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const loger = new Logger(`Bootstrap logger`);

  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);
  loger.log(`💥    Application started @:port: ${port}`);
}
bootstrap();
