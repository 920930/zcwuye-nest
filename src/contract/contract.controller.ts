import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, UploadedFile } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import * as dayjs from 'dayjs';

import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Public } from '../app/decorator/public.decorator';
import { diskStorage } from 'multer';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @Public()
  @UseInterceptors(
    FilesInterceptor('files', undefined, {
      // storage: diskStorage({
      //   destination: './uploads/2023',
      //   filename(req, file, cb) {
      //     console.log(123);
      //     const filename = `${dayjs().valueOf()}-${Math.random().toString(16).slice(2)}.${file.mimetype.split('/')[1]}`;
      //     return cb(null, filename);
      //   },
      // }),
    }),
  )
  create(@UploadedFiles() files: Array<Express.Multer.File>, @Body() createContractDto: any) {
    // @UseInterceptors(FileInterceptor('files'))
    // create(@UploadedFile() files: Express.Multer.File, @Body() createContractDto: any) {
    // console.log(createContractDto);
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
