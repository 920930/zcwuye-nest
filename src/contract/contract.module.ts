import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as dayjs from 'dayjs';
import { join } from 'path';

import { Contract } from './entities/contract.entity';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';

import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';
import { CompanyModule } from '../company/company.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract]),
    ConfigModule,
    UserModule,
    RoomModule,
    CompanyModule,
    MulterModule.register({
      storage: diskStorage({
        destination: `${join(__dirname, '../../', 'uploads')}/${dayjs().year()}`,
        filename(req, file, cb) {
          const filename = `${dayjs().format('MMDDHHmmss')}-${Math.random().toString(16).slice(2)}.${file.mimetype.split('/')[1]}`;
          return cb(null, filename);
        },
      }),
    }),
  ],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
