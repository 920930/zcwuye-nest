import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Adminer } from './entities/adminer.entity';
import { CreateAdminerDto } from './dto/create-adminer.dto';
import { UpdateAdminerDto } from './dto/update-adminer.dto';
import { CompanyService } from '../company/company.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class AdminerService {
  constructor(
    @InjectRepository(Adminer) private adminerRepository: Repository<Adminer>,
    private companyService: CompanyService,
    private roleService: RoleService,
  ) {}
  async create(createAdminerDto: CreateAdminerDto) {
    const one = await this.adminerRepository.findOneBy({ phone: createAdminerDto.phone });
    if (one) throw new ForbiddenException('手机号已经存在');
    if (!createAdminerDto.companies.length) throw new ForbiddenException('公司不能为空');
    const info = this.adminerRepository.create({ ...createAdminerDto, companies: [] });
    // 关联公司
    createAdminerDto.companies.forEach(async (item) => {
      const com = await this.companyService.findOne(item as unknown as number);
      info.companies.push(com);
    });
    // 关联角色
    info.role = await this.roleService.findOne(createAdminerDto.roleId);
    this.adminerRepository.save(info);
    return '创建成功';
    // this.adminerRepository.save(info);
  }

  findAll() {
    return this.adminerRepository.find();
  }

  findOne(id: number) {
    return this.adminerRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    // return this.adminerRepository
    //   .createQueryBuilder('adminer')
    //   .where('adminer.id=:id', { id })
    //   .leftJoinAndSelect('adminer.role', 'role')
    //   .leftJoinAndSelect('adminer.companies', 'company')
    //   .select(['adminer', 'role.name', 'company.id'])
    //   .getOne();
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
