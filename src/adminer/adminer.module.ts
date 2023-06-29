import { Module, Global } from '@nestjs/common';
import { AdminerService } from './adminer.service';
import { AdminerController } from './adminer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adminer } from './entities/adminer.entity';
import { CompanyModule } from '../company/company.module';
import { RoleModule } from 'src/role/role.module';

// Global将adminermodel设置为全局model
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Adminer]), CompanyModule, RoleModule],
  controllers: [AdminerController],
  providers: [AdminerService],
  exports: [AdminerService],
})
export class AdminerModule {}
