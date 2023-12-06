import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

import { Role } from '../app/decorator/role.decorator';
import { RoleType } from '../app/enum/role.enum';

import { CostypeService } from './costype.service';

import { CreateCostypeDto } from './dto/create-costype.dto';
import { UpdateCostypeDto } from './dto/update-costype.dto';

@Controller('costype')
export class CostypeController {
  constructor(private readonly costypeService: CostypeService) {}

  @Role(RoleType.SUPER)
  @Post()
  create(@Body() createCostypeDto: CreateCostypeDto) {
    return this.costypeService.create(createCostypeDto);
  }

  @Get()
  findAll() {
    return this.costypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.costypeService.findOne(+id);
  }

  @Role(RoleType.SUPER)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCostypeDto: UpdateCostypeDto) {
    return this.costypeService.update(+id, updateCostypeDto);
  }

  @Role(RoleType.SUPER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costypeService.remove(+id);
  }
}
