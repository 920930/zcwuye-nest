import { Injectable } from '@nestjs/common';
import { CreateCostypeDto } from './dto/create-costype.dto';
import { UpdateCostypeDto } from './dto/update-costype.dto';

@Injectable()
export class CostypeService {
  create(createCostypeDto: CreateCostypeDto) {
    return 'This action adds a new costype';
  }

  findAll() {
    return `This action returns all costype`;
  }

  findOne(id: number) {
    return `This action returns a #${id} costype`;
  }

  update(id: number, updateCostypeDto: UpdateCostypeDto) {
    return `This action updates a #${id} costype`;
  }

  remove(id: number) {
    return `This action removes a #${id} costype`;
  }
}
