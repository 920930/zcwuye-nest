import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'node:path';
import { access, constants, unlinkSync } from 'node:fs';

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
    private configService: ConfigService,
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
        .orderBy('contract.id', 'DESC')
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
    Reflect.deleteProperty(updateContractDto, 'id');
    if (updateContractDto.yyzz.length) {
      const host = this.configService.get('HOST_SERVICE');
      const yyzz = updateContractDto.yyzz?.split(',');
      updateContractDto.yyzz = yyzz.map((item) => (item.includes(host) ? item.slice(host.length + 1) : item)).join(',');
    } else {
      updateContractDto.yyzz = null;
    }
    const contract = await this.contractRepository.findOneBy({ id });
    const rooms = await this.roomService.findIn(updateContractDto.rooms.split(','));
    this.contractRepository.merge(contract, { ...updateContractDto, rooms });
    this.contractRepository.save(contract);
    return `This action updates a #${id} contract`;
  }

  remove(id: number) {
    return `This action removes a #${id} contract`;
  }

  async removeImg(id: number, img: string) {
    const len = this.configService.get<string>('HOST_SERVICE').length + 1;
    const contract = await this.contractRepository.findOneBy({ id });
    if (!contract.yyzz) return;
    const yyzzArr = contract.yyzz.split(',');
    img = img.slice(len);
    const index = yyzzArr.findIndex((item) => item.includes(img));
    if (index !== -1) yyzzArr.splice(index, 1);
    // 删除数据库的图片,图片在contract.entity中已经后置加载后自动添加域名链接
    const yyzz = yyzzArr.map((item) => item.slice(len)).join(',');
    contract.yyzz = yyzz.length ? yyzz : null;
    await this.contractRepository.save(contract);
    // // 删除本地物理路径图片
    const localPth = resolve(__dirname, '../../' + img);
    access(localPth, constants.F_OK, (err) => {
      if (!err) unlinkSync(localPth);
    });
    return `This action removes a #${id} contract`;
  }
}
