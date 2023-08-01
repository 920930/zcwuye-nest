import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
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
      .orderBy('room.qu', 'ASC')
      .orderBy('room.num', 'ASC')
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    const room = await this.roomRepository.findOneBy({ id });
    this.roomRepository.merge(room, updateRoomDto);
    await this.roomRepository.save(room);
    return `This action updates a #${id} room`;
  }

  async remove(id: number) {
    // const one = await this.roomRepository.find({ where: { id }, relations: [''] });
    await this.roomRepository.delete({ id });
    return `This action removes a #${id} room`;
  }
}
