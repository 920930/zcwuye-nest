import { Module, Global } from '@nestjs/common';
import { AdminerService } from './adminer.service';
import { AdminerController } from './adminer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Adminer } from './entities/adminer.entity';

// Global将adminermodel设置为全局model
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Adminer])],
  controllers: [AdminerController],
  providers: [AdminerService],
  exports: [AdminerService],
})
export class AdminerModule {}
