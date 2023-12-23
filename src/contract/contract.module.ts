import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as dayjs from 'dayjs';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Contract } from './entities/contract.entity';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';

import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';
import { CompanyModule } from '../company/company.module';
import { ConlistModule } from '../conlist/conlist.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract]),
    ConfigModule,
    UserModule,
    RoomModule,
    CompanyModule,
    forwardRef(() => ConlistModule),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: `${join(__dirname, '../../', `${configService.get<string>('MULTER_DEST')}/${dayjs().year()}`)}`,
          filename(req, file, cb) {
            const filename = `${dayjs().format('MMDDHHmmss')}-${Math.random().toString(16).slice(2)}.${file.mimetype.split('/')[1]}`;
            return cb(null, filename);
          },
        }),
        dest: `${dayjs().year()}`,
        // fileFilter(req, file, callback) {
        // 对上传文件的验证，比如对文件类型只能是图片类型的验证
        //   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        //     return callback(new Error('Only image files are allowed!'), false);
        //   }
        //   callback(null, true);
        // },
      }),
    }),
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: `${join(__dirname, '../../', 'uploads')}/${dayjs().year()}`,
    //     filename(req, file, cb) {
    //       const filename = `${dayjs().format('MMDDHHmmss')}-${Math.random().toString(16).slice(2)}.${file.mimetype.split('/')[1]}`;
    //       return cb(null, filename);
    //     },
    //   }),
    // }),
  ],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
