import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @UseInterceptors(FileInterceptor('files'))
  create(@Body() createContractDto: any, @UploadedFiles() files: Express.Multer.File[]) {
    console.log(createContractDto);
    console.log(files);
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
