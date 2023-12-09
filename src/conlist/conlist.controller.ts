import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.conlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConlistDto: UpdateConlistDto) {
    return this.conlistService.update(+id, updateConlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conlistService.remove(+id);
  }
}
