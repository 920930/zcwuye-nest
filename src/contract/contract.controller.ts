import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Public } from '../app/decorator/public.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService, private configService: ConfigService) {}

  @Post()
  @Public()
  @UseInterceptors(FilesInterceptor('files'))
  create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() createContractDto: CreateContractDto) {
    // @UseInterceptors(FileInterceptor('files'))
    // create(@UploadedFile() files: Express.Multer.File, @Body() createContractDto: any) {
    // console.log(createContractDto);
    files.forEach((file) => {
      const arr = file.path.split(this.configService.get<string>('MULTER_DEST'));
      const u = this.configService.get<string>('MULTER_DEST') + arr[1].replaceAll(/(\\)|(\/\/)/g, '/');
      createContractDto.yyzz += `${u},`;
    });
    return this.contractService.create(createContractDto);
  }

  @Get()
  findAll() {
    return this.contractService.findAll();
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
