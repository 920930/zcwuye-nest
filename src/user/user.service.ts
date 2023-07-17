import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';

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

  async findAll(page: number, size: number) {
    console.log(page, size);
    const data = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.companies', 'companies')
      .orderBy('user.id', 'DESC')
      .skip(page - 1)
      .take(size)
      .getManyAndCount();
    // const data = await this.userRepository.findAndCount({ relations: ['companies'] });
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    const companies = await this.companyService.findIn(...updateUserDto.companies);
    const user = await this.userRepository.findOneBy({ id });
    this.userRepository.merge(user, { ...updateUserDto, companies });
    await this.userRepository.save(user);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
