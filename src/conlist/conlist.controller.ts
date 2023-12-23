import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConlistService } from './conlist.service';
import { CreateConlistDto } from './dto/create-conlist.dto';
import { UpdateConlistDto } from './dto/update-conlist.dto';

@Controller('conlist')
export class ConlistController {
  constructor(private readonly conlistService: ConlistService) {}

  @Post()
  create(@Body() createConlistDto: CreateConlistDto) {
    return this.conlistService.create(createConlistDto);
  }

  @Get()
  findAll(@Query() info: { contractId: string; page: string; size: string }) {
    return this.conlistService.findAll(+info.contractId, +info.page, +info.size);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConlistDto: UpdateConlistDto) {
    console.log(id, 123);
    return this.conlistService.update(+id, updateConlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conlistService.remove(+id);
  }
}
