import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt/dist';
// import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    // JwtModule.registerAsync({
    //   global: true,
    //   // imports: [ConfigModule], 已经设置了全局，这里无需引入
    //   inject: [ConfigService],
    //   useFactory(configService: ConfigService) {
    //     return {
    //       secret: configService.get('JwtSecret'),
    //       signOptions: { expiresIn: configService.get('JwtExpired') },
    //     };
    //   },
    // }),
    // adminerService的model是全局设置了，这里无需引入adminerMOdel
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
