import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CostypeService } from './costype.service';
import { CreateCostypeDto } from './dto/create-costype.dto';
import { UpdateCostypeDto } from './dto/update-costype.dto';

@Controller('costype')
export class CostypeController {
  constructor(private readonly costypeService: CostypeService) {}

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCostypeDto: UpdateCostypeDto) {
    return this.costypeService.update(+id, updateCostypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.costypeService.remove(+id);
  }
}
