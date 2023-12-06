import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';

import { Role } from '../app/decorator/role.decorator';
import { RoleType } from '../app/enum/role.enum';

import { ReqAdminer } from '../app/decorator/public.decorator';
import { TAdminer } from '../app/enum/typings';

import { CostService } from './cost.service';

import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { SearchCostDto } from './dto/search-cost.dto';

@Controller('cost')
export class CostController {
  constructor(private readonly costService: CostService) {}

  //@ReqAdminer() adminer 类型其实是Adminer
  @Role(RoleType.ADMIN, RoleType.CAIWU)
  @Post()
  create(@Body() createCostDto: CreateCostDto, @ReqAdminer() adminer: any) {
    return this.costService.create(createCostDto, adminer);
  }

  @Get()
  findAll(@Query() val: SearchCostDto) {
    return this.costService.findAll(val);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costService.findOne(+id);
  }

  @Role(RoleType.ADMIN, RoleType.CAIWU)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCostDto: UpdateCostDto, @ReqAdminer() adminer: any) {
    return this.costService.update(+id, updateCostDto, adminer);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costService.remove(+id);
  }
}
