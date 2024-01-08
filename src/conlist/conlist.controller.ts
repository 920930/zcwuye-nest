import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFiles, ParseIntPipe } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { ConlistService } from './conlist.service';
import { CreateConlistDto } from './dto/create-conlist.dto';
import { UpdateConlistDto } from './dto/update-conlist.dto';

@Controller('conlist')
export class ConlistController {
  constructor(private readonly conlistService: ConlistService, private configService: ConfigService) {}

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

  @Post('upload/:id')
  @UseInterceptors(FilesInterceptor('file'))
  upload(@Param('id', ParseIntPipe) id: number, @UploadedFiles() file: Array<Express.Multer.File>) {
    const ret: string[] = [];
    file.forEach((file) => {
      const arr = file.path.split(this.configService.get<string>('MULTER_DEST'));
      const u = this.configService.get<string>('MULTER_DEST') + arr[1].replaceAll(/(\\)|(\/\/)/g, '/');
      ret.push(u);
    });
    return this.conlistService.updateAndFile(id, ret);
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
