/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Dragon Ball API Documentation')
    .setDescription('Dragon Ball Characters Documentation')
    .setVersion('1.0')
    .addTag('Characters')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('Documentation', app, document);
  await app.listen(configService.get('PORT'));
}
bootstrap();
