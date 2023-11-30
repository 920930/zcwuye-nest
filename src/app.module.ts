import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { AdminerModule } from './adminer/adminer.module';
import { CompanyModule } from './company/company.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';

import { AuthGuard } from './app/guard/auth.guard';
import { RoleGuard } from './app/guard/role.guard';
import { FormatInterceptor } from './app/interceptor/format.interceptor';
import { UserModule } from './user/user.module';
import { ContractModule } from './contract/contract.module';
import { RoomModule } from './room/room.module';
import { PermissionModule } from './permission/permission.module';
import { CostModule } from './cost/cost.module';

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
          autoLoadEntities: true,
          timezone: 'Z',
          synchronize: true,
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
    CompanyModule,
    RoleModule,
    MenuModule,
    UserModule,
    ContractModule,
    RoomModule,
    PermissionModule,
    CostModule,
  ],
  controllers: [],
  providers: [
    // 全局jwt身份验证token，通过auth/decorators/public 方法去除是否jwt验证
    // 也可以在main.ts中全局使用这个，但推荐通过这里
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    // 统一返回格式
    { provide: APP_INTERCEPTOR, useClass: FormatInterceptor },
  ],
})
export class AppModule {}
