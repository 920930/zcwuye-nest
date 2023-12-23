import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Conlist } from './entities/conlist.entity';

import { CreateConlistDto } from './dto/create-conlist.dto';
import { UpdateConlistDto } from './dto/update-conlist.dto';

import { ContractService } from '../contract/contract.service';

@Injectable()
export class ConlistService {
  // 因为在model中已经使用forwardRef,这里不在需要这样了 @Inject(forwardRef(() => ContractService)) private contractService: ContractService,
  constructor(@InjectRepository(Conlist) private conlistRepository: Repository<Conlist>, private contractService: ContractService) {}
  async create(createConlistDto: CreateConlistDto) {
    Reflect.deleteProperty(createConlistDto, 'id');
    const contract = await this.contractService.findOneOnly(createConlistDto.contractId);
    const conlist = this.conlistRepository.create({ ...createConlistDto, contract });
    await this.conlistRepository.save(conlist);
    return 'This action adds a new conlist213';
  }

  async findAll(contractId: number, page = 1, size = 20) {
    return this.conlistRepository
      .createQueryBuilder('conlist')
      .where('conlist.contractId = :id', { id: contractId })
      .orderBy('conlist.id', 'DESC')
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} conlist`;
  }

  async update(id: number, updateConlistDto: UpdateConlistDto) {
    Reflect.deleteProperty(updateConlistDto, 'contractId');
    await this.conlistRepository.update(id, updateConlistDto);
    return `This action updates a #${id} conlist`;
  }

  async remove(id: number) {
    await this.conlistRepository.delete(id);
    return `This action removes a #${id} conlist`;
  }
}
