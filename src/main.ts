import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { port } from 'env';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest JS Starter')
    .setDescription('The Nest JS Starter API description')
    .setVersion('1.0')
    .addTag('Nest JS Starter')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  let PORT = port || 3000

  await app.listen(PORT).then((_: any) => {
    console.log('Server Listening on port ' + PORT);
  });
}

bootstrap();
