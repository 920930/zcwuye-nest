import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import type { Request } from 'express';

import { AdminerService } from './adminer.service';
import { CreateAdminerDto } from './dto/create-adminer.dto';
import { UpdateAdminerDto } from './dto/update-adminer.dto';
import { ReqAdminer } from '../app/decorator/public.decorator';
import { TAdminer } from '../app/enum/typings';

import { Role } from '../app/decorator/role.decorator';
import { RoleType } from '../app/enum/role.enum';

@Controller('adminer')
export class AdminerController {
  constructor(private readonly adminerService: AdminerService) {}

  @Get('info')
  async me(@ReqAdminer() adminer: TAdminer) {
    const one = await this.adminerService.findOne(adminer.id);
    return {
      ...one,
      role: one.role.name,
    };
  }

  @Role(RoleType.SUPER)
  @Post()
  create(@Body() createAdminerDto: CreateAdminerDto) {
    return this.adminerService.create(createAdminerDto);
  }

  @Role(RoleType.SUPER)
  @Get()
  findAll() {
    return this.adminerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminerService.findOne(+id);
  }

  @Role(RoleType.SUPER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminerDto: UpdateAdminerDto) {
    return this.adminerService.update(+id, updateAdminerDto);
  }

  @Role(RoleType.SUPER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminerService.remove(+id);
  }
}
