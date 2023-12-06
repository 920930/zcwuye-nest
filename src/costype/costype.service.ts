import { Injectable } from '@nestjs/common';
import { CreateCostypeDto } from './dto/create-costype.dto';
import { UpdateCostypeDto } from './dto/update-costype.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Costype } from './entities/costype.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CostypeService {
  constructor(@InjectRepository(Costype) private costTypeRepository: Repository<Costype>) {}
  create(createCostypeDto: CreateCostypeDto) {
    Reflect.deleteProperty(createCostypeDto, 'id');
    const costype = this.costTypeRepository.create(createCostypeDto);
    this.costTypeRepository.save(costype);
    return 'This action adds a new costype';
  }

  findAll() {
    return this.costTypeRepository.find();
  }

  async findOne(id: number) {
    return await this.costTypeRepository.findOneBy({ id });
  }

  async update(id: number, updateCostypeDto: UpdateCostypeDto) {
    Reflect.deleteProperty(updateCostypeDto, 'id');
    await this.costTypeRepository.update(id, updateCostypeDto);
    return `This action updates a #${id} costype`;
  }

  remove(id: number) {
    return `This action removes a #${id} costype`;
  }
}
