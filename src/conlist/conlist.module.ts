import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conlist } from './entities/conlist.entity';

import { ContractModule } from '../contract/contract.module';

import { ConlistService } from './conlist.service';
import { ConlistController } from './conlist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Conlist]), forwardRef(() => ContractModule)],
  controllers: [ConlistController],
  providers: [ConlistService],
})
export class ConlistModule {}
