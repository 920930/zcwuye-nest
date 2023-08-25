import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';

import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { RoomService } from '../room/room.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract) private contractRepository: Repository<Contract>,
    private roomService: RoomService,
    private userService: UserService,
  ) {}
  async create(createContractDto: CreateContractDto) {
    const rooms = await this.roomService.findIn(createContractDto.rooms.split(','));
    const user = await this.userService.findOne(+createContractDto.userId);
    const contract = this.contractRepository.create({ ...createContractDto, rooms, user });
    await this.contractRepository.save(contract);
    return 'This action adds a new contract';
  }

  findAll() {
    return this.contractRepository.find({ relations: ['rooms', 'user'] });
  }

  findOne(id: number) {
    return `This action returns a #${id} contract`;
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
