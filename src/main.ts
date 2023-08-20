import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });
  // 设置跨域，也可以如上设置
  // app.enableCors();
  app.setGlobalPrefix('api');
  // 全局管道
  // whitelist 过滤非设定字段，只显示管道中设定的字段(去除多余字段)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useStaticAssets(join(__dirname, '..', './public'), { prefix: '/static' });
  app.useStaticAssets(join(__dirname, '..', './uploads'), { prefix: '/uploads' });
  await app.listen(3000);
}
bootstrap();
