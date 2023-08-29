import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Query } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Public } from '../app/decorator/public.decorator';
import { SearchContractDto } from './dto/search-contract.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService, private configService: ConfigService) {}

  @Post()
  @Public()
  @UseInterceptors(FilesInterceptor('files'))
  create(@Body() createContractDto: CreateContractDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    // @UseInterceptors(FileInterceptor('files'))
    // create(@UploadedFile() files: Express.Multer.File, @Body() createContractDto: any) {
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
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(+id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractService.remove(+id);
  }
}
