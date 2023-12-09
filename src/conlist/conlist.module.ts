import { Module } from '@nestjs/common';
import { ConlistService } from './conlist.service';
import { ConlistController } from './conlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conlist } from './entities/conlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Conlist])],
  controllers: [ConlistController],
  providers: [ConlistService],
})
export class ConlistModule {}
