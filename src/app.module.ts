import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';

import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { AppInterceptor } from './app.interceptor';
import { AdminerModule } from './adminer/adminer.module';

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
          entities: [__dirname + '/**/entities/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
    JwtModule.registerAsync({
      global: true,
      // imports: [ConfigModule], 已经设置了全局，这里无需引入
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('JwtSecret'),
          signOptions: { expiresIn: configService.get('JwtExpired') },
        };
      },
    }),
    AuthModule,
    AdminerModule,
  ],
  controllers: [],
  providers: [
    // 全局jwt身份验证token，通过auth/decorators/public 方法去除是否jwt验证
    // 也可以在main.ts中全局使用这个，但推荐通过这里
    { provide: APP_GUARD, useClass: AuthGuard },
    // 统一返回格式
    { provide: APP_INTERCEPTOR, useClass: AppInterceptor },
  ],
})
export class AppModule {}
