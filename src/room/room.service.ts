import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { In, Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepository: Repository<Room>, private companyService: CompanyService) {}
  async create(createRoomDto: CreateRoomDto) {
    Reflect.deleteProperty(createRoomDto, 'id');
    const company = await this.companyService.findOne(createRoomDto.companyId);
    if (company.name === '集团') throw new ForbiddenException('集团不是项目');
    if (company.dong === 0) createRoomDto.dong = 0;
    const room = this.roomRepository.create({ ...createRoomDto, company });
    await this.roomRepository.save(room);
    return 'This action adds a new room';
  }

  findAll(companyId: number) {
    return this.roomRepository
      .createQueryBuilder('room')
      .innerJoinAndSelect('room.company', 'company', 'company.id=:id', { id: companyId })
      .leftJoinAndSelect('room.contract', 'contract')
      .select(['room', 'company.id', 'contract.id'])
      .orderBy('room.qu', 'ASC')
      .orderBy('room.num', 'ASC')
      .getMany();
  }

  findOne(id: number, contractId: number) {
    return `This action returns a #${id} - ${contractId} room`;
  }

  findIn(id: (string | number)[]) {
    return this.roomRepository.find({ where: { id: In(id) } });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.findOneBy({ id });
    this.roomRepository.merge(room, updateRoomDto);
    await this.roomRepository.save(room);
    return `This action updates a #${id} room`;
  }

  async remove(id: number) {
    const one = await this.roomRepository.findOne({ where: { id }, relations: ['contract'] });
    if (one.contract) throw new ForbiddenException('请先删除合同');
    await this.roomRepository.delete({ id });
    return `This action removes a #${id} room`;
  }
}
