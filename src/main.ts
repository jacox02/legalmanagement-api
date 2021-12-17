import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;

  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(port);
  console.log(`App listening in port: ${port}`);
}
bootstrap();
