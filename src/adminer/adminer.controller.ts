import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import type { Request } from 'express';

import { AdminerService } from './adminer.service';
import { CreateAdminerDto } from './dto/create-adminer.dto';
import { UpdateAdminerDto } from './dto/update-adminer.dto';
import { Public, ReqAdminer } from '../app/decorator/public.decorator';
import { TAdminer } from '../app/enum/typings';

@Controller('adminer')
export class AdminerController {
  constructor(private readonly adminerService: AdminerService) {}

  @Get('info')
  async me(@ReqAdminer() adminer: TAdminer) {
    console.log(adminer);
    const one = await this.adminerService.findOne(adminer.id);
    return {
      ...one,
      role: one.role.name,
    };
  }

  @Public()
  @Post()
  create(@Body() createAdminerDto: CreateAdminerDto) {
    return this.adminerService.create(createAdminerDto);
  }

  @Get()
  findAll() {
    return this.adminerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminerDto: UpdateAdminerDto) {
    return this.adminerService.update(+id, updateAdminerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminerService.remove(+id);
  }
}
