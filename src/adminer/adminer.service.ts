import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Adminer } from './entities/adminer.entity';
import { CreateAdminerDto } from './dto/create-adminer.dto';
import { UpdateAdminerDto } from './dto/update-adminer.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AdminerService {
  constructor(@InjectRepository(Adminer) private adminerRepository: Repository<Adminer>) {}
  async create(createAdminerDto: CreateAdminerDto) {
    const one = await this.adminerRepository.findOneBy({ phone: createAdminerDto.phone });
    if (one) throw new ForbiddenException('手机号已经存在');
    const info = this.adminerRepository.create(createAdminerDto);
    this.adminerRepository.save(info);
    return '创建成功';
  }

  findAll() {
    return this.adminerRepository.find();
  }

  findOne(id: number) {
    return this.adminerRepository.findOneBy({ id });
  }

  async update(id: number, updateAdminerDto: UpdateAdminerDto) {
    const adminer = await this.adminerRepository.findOneBy({ id });
    this.adminerRepository.merge(adminer, updateAdminerDto);
    return 'ok';
  }

  remove(id: number) {
    return `This action removes a #${id} adminer`;
  }

  findByPhone(phone: string) {
    return this.adminerRepository
      .createQueryBuilder('adminer')
      .where('adminer.phone=:phone', { phone })
      .andWhere('adminer.state=true')
      .addSelect('adminer.password')
      .getOne();
  }
}
