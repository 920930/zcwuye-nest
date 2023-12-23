import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cost } from './entities/cost.entity';

import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { SearchCostDto } from './dto/search-cost.dto';

import { ContractService } from '../contract/contract.service';
import { CostypeService } from '../costype/costype.service';
import { RoleType } from '../app/enum/role.enum';

@Injectable()
export class CostService {
  constructor(
    @InjectRepository(Cost) private costRepository: Repository<Cost>,
    private contractService: ContractService,
    private costypeService: CostypeService,
  ) {}
  async create(createCostDto: CreateCostDto, adminer: any) {
    const contract = await this.contractService.findOne(createCostDto.contractId);
    const costype = await this.costypeService.findOne(createCostDto.costypeId);
    // const adminer = await this.adminerService.findUone(uid);

    if (!contract) throw new ForbiddenException('合同不存在');
    if (!costype) throw new ForbiddenException('费用类别不存在');

    const cost = this.costRepository.create({ ...createCostDto, contract, costype, adminer });
    await this.costRepository.save(cost);
    return 'This action adds a new cost';
  }

  async findAll(info: SearchCostDto) {
    return this.costRepository
      .createQueryBuilder('cost')
      .leftJoinAndSelect('cost.costype', 'costype')
      .leftJoinAndSelect('cost.adminer', 'adminer')
      .where(`cost.costypeId ${info.costypeId ? '=' + info.costypeId : '!= 0'}`)
      .andWhere('cost.contractId = :id', { id: info.contractId })
      .orderBy('cost.id', 'DESC')
      .skip((info.page - 1) * info.size)
      .take(info.size)
      .getManyAndCount();
  }

  findOne(id: number) {
    return this.costRepository.findOneBy({ id });
  }

  async update(id: number, updateCostDto: UpdateCostDto, adminer: any) {
    Reflect.deleteProperty(updateCostDto, 'id');
    const cost = await this.costRepository.findOne({ where: { id }, relations: ['adminer'] });
    // const adminer = await this.adminerService.findOne(id);
    if (cost.adminer.id != adminer.id || ![RoleType.ADMIN, RoleType.SUPER].includes(adminer.role.name)) {
      throw new ForbiddenException('您无权修改');
    }
    const costype = await this.costypeService.findOne(updateCostDto.costypeId);
    // 移除关联字段id
    Reflect.deleteProperty(updateCostDto, 'contractId');
    Reflect.deleteProperty(updateCostDto, 'costypeId');
    // 一旦绑定，合同id不能修改，可直接删除cost
    await this.costRepository.update(id, { ...updateCostDto, costype });
    return `This action updates a #${id} cost`;
  }

  remove(id: number) {
    return `This action removes a #${id} cost`;
  }
}
