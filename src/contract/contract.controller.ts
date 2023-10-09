import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { SearchContractDto } from './dto/search-contract.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService, private configService: ConfigService) {}

  // contract.module配置 UploadedFiles 上传
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  create(@Body() createContractDto: CreateContractDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    // @UseInterceptors(FileInterceptor('files'))
    // create(@UploadedFile() files: Express.Multer.File, @Body() createContractDto: any) {}
    if (files.length) {
      const ret: string[] = [];
      files.forEach((file) => {
        const arr = file.path.split(this.configService.get<string>('MULTER_DEST'));
        const u = this.configService.get<string>('MULTER_DEST') + arr[1].replaceAll(/(\\)|(\/\/)/g, '/');
        ret.push(u);
      });
      createContractDto.yyzz = ret.join(',');
    }
    return this.contractService.create(createContractDto);
  }

  @Get()
  findAll(@Query() searchInfo: SearchContractDto) {
    return this.contractService.findAll(searchInfo);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.contractService.findOne(+id);
    return {
      ...data,
      rooms: data.rooms.map((item) => `${item.id}`),
      yyzz: data.yyzz?.length ? data.yyzz.split(',') : [],
    };
  }

  // contract.module配置 UploadedFiles 上传
  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    if (files.length) {
      const ret: string[] = [];
      files.forEach((file) => {
        const arr = file.path.split(this.configService.get<string>('MULTER_DEST'));
        const u = this.configService.get<string>('MULTER_DEST') + arr[1].replaceAll(/(\\)|(\/\/)/g, '/');
        ret.push(u);
      });
      updateContractDto.yyzz?.length && ret.push(...updateContractDto.yyzz.split(','));
      updateContractDto.yyzz = ret.join(',');
    }
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete('img')
  removeImg(@Query() info: { id: string; img: string }) {
    return this.contractService.removeImg(+info.id, info.img);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
