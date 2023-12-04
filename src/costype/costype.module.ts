import { Module } from '@nestjs/common';
import { CostypeService } from './costype.service';
import { CostypeController } from './costype.controller';

@Module({
  controllers: [CostypeController],
  providers: [CostypeService]
})
export class CostypeModule {}
