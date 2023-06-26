import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV || 'development'}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: configService.get<'mysql'>('DB_TYPE'),
          host: 'localhost',
          port: 3306,
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局jwt身份验证token，通过auth/decorators/public 方法去除是否jwt验证
    // 也可以在main.ts中全局使用这个，但推荐通过这里
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
