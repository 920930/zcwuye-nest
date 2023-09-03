import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';

import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';
import { CompanyService } from '../company/company.service';

import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { SearchContractDto } from './dto/search-contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract) private contractRepository: Repository<Contract>,
    private roomService: RoomService,
    private userService: UserService,
    private companyService: CompanyService,
  ) {}
  async create(createContractDto: CreateContractDto) {
    const rooms = await this.roomService.findIn(createContractDto.rooms.split(','));
    const user = await this.userService.findOne(+createContractDto.userId);
    const company = await this.companyService.findOne(+createContractDto.companyId);
    const contract = this.contractRepository.create({ ...createContractDto, rooms, user, company });
    await this.contractRepository.save(contract);
    return 'This action adds a new contract';
  }

  findAll(info: SearchContractDto) {
    return (
      this.contractRepository
        .createQueryBuilder('contract')
        // .leftJoinAndSelect('contract.rooms', 'rooms')
        .leftJoinAndSelect('contract.user', 'user')
        .leftJoinAndSelect('contract.company', 'company')
        .where(info.companyId != '1' && 'contract.companyId = :id', { id: info.companyId })
        .orderBy('contract.endTime', 'DESC')
        .select([
          'contract.id',
          'contract.bianma',
          'contract.name',
          'contract.oldRooms',
          'contract.startTime',
          'contract.endTime',
          'company.id',
          'company.name',
          'user.id',
          'user.name',
          'user.phone',
        ])
        .skip((+info.page - 1) * +info.size) // 偏移量，跳过的实体数量
        .take(+info.size) // 分页限制 获取的实体数量
        .getManyAndCount()
    );
  }

  findOne(id: number) {
    return this.contractRepository.findOne({ where: { id }, relations: ['rooms', 'user'] });
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    const contract = await this.contractRepository.findOneBy({ id });
    const rooms = await this.roomService.findIn(updateContractDto.rooms.split(','));
    this.contractRepository.merge(contract, { ...updateContractDto, rooms });
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }
}
