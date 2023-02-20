import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /**
   * @returns {any}
   */
  const config = new DocumentBuilder()
    .setTitle('Nest JS Starter')
    .setDescription('The Nest JS Starter API description')
    .setVersion('1.0')
    .addTag('Nest JS Starter')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000).then((_: any) => {
    console.log('Server Listening');
    new AppModule().startDbConnection();
  });
}

bootstrap();
