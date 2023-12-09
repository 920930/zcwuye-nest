import { Injectable } from '@nestjs/common';
import { CreateConlistDto } from './dto/create-conlist.dto';
import { UpdateConlistDto } from './dto/update-conlist.dto';

@Injectable()
export class ConlistService {
  create(createConlistDto: CreateConlistDto) {
    return 'This action adds a new conlist';
  }

  findAll() {
    return `This action returns all conlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conlist`;
  }

  update(id: number, updateConlistDto: UpdateConlistDto) {
    return `This action updates a #${id} conlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} conlist`;
  }
}
