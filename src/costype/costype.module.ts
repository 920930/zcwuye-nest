import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Costype } from './entities/costype.entity';
import { CostypeService } from './costype.service';
import { CostypeController } from './costype.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Costype])],
  controllers: [CostypeController],
  providers: [CostypeService],
  exports: [CostypeService],
})
export class CostypeModule {}
