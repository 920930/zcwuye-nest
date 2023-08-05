import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CompanyService } from '../company/company.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, private companyService: CompanyService) {}
  async create(createUserDto: CreateUserDto) {
    const companies = await this.companyService.findIn(...createUserDto.companies);
    Reflect.deleteProperty(createUserDto, 'id');
    const user = this.userRepository.create({ ...createUserDto, companies });
    await this.userRepository.save(user);
    return 'This action adds a new user';
  }

  async findAll(info: SearchUserDto) {
    const arr = [];
    info.name && arr.push({ name: info.name });
    info.phone && arr.push({ phone: info.phone });
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.companies', 'companies')
      .orderBy('user.id', 'DESC')
      .where(arr)
      .skip((+info.page - 1) * +info.size) // 偏移量，跳过的实体数量
      .take(+info.size) // 分页限制 获取的实体数量
      .getManyAndCount();
    // const data = await this.userRepository.findAndCount({ relations: ['companies'] });
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const companies = await this.companyService.findIn(...updateUserDto.companies);
    const user = await this.userRepository.findOneBy({ id });
    this.userRepository.merge(user, { ...updateUserDto, companies });
    await this.userRepository.save(user);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findPhoneCard(phone: string, card: string) {
    return await this.userRepository.find({
      where: [{ phone }, { card }],
    });
  }

  async searchAll(val: string) {
    const key = /^1[3-9]/.test(val) ? 'phone' : 'name';
    return await this.userRepository.find({ where: { [key]: Like(`%${val}%`) } });
  }
}
