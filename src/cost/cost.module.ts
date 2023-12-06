import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CostService } from './cost.service';
import { CostController } from './cost.controller';
import { Cost } from './entities/cost.entity';

import { ContractModule } from '../contract/contract.module';
import { CostypeModule } from '../costype/costype.module';
import { AdminerModule } from '../adminer/adminer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cost]), ContractModule, CostypeModule, AdminerModule],
  controllers: [CostController],
  providers: [CostService],
})
export class CostModule {}
