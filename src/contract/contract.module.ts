import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as dayjs from 'dayjs';
import { join } from 'path';

@Module({
  imports: [
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
