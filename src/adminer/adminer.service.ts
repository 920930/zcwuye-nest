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
    if (!createAdminerDto.password) {
      throw new ForbiddenException('密码不能为空');
    }
    if (createAdminerDto.password != createAdminerDto.pwd) {
      throw new ForbiddenException('两次密码不一致');
    }
    const one = await this.adminerRepository.findOneBy({ phone: createAdminerDto.phone });
    if (one) throw new ForbiddenException('手机号已经存在');
    if (!createAdminerDto.companies.length) throw new ForbiddenException('公司不能为空');
    const adminer = this.adminerRepository.create();
    const role = await this.roleService.findOne(createAdminerDto.role);
    const companies = await this.companyService.findIn(...createAdminerDto.companies);
    this.adminerRepository.merge(adminer, { ...createAdminerDto, companies, role });
    await this.adminerRepository.save(adminer);
    return '创建成功';
  }

  findAll() {
    return this.adminerRepository.find({ relations: ['role', 'companies'] });
  }

  findOne(id: number) {
    return this.adminerRepository.findOne({
      where: { id },
      relations: ['role', 'companies'],
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
    if (updateAdminerDto.password && updateAdminerDto.password != updateAdminerDto.pwd) {
      throw new ForbiddenException('两次密码不一致');
    }
    const adminer = await this.adminerRepository.findOneBy({ id });
    const role = await this.roleService.findOne(updateAdminerDto.role);
    const companies = await this.companyService.findIn(...updateAdminerDto.companies);
    this.adminerRepository.merge(adminer, { ...updateAdminerDto, companies, role });
    await this.adminerRepository.save(adminer);
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
