import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(@InjectRepository(Company) private companyRepository: Repository<Company>) {}
  async create(createCompanyDto: CreateCompanyDto) {
    Reflect.deleteProperty(createCompanyDto, 'id');
    const company = this.companyRepository.create({ ...createCompanyDto, qutype: createCompanyDto.qutype.sort((a, b) => a - b).join('') });
    await this.companyRepository.save(company);
    return 'This action adds a new company';
  }

  async findAll() {
    return await this.companyRepository.find();
  }

  async findOne(id: number) {
    return await this.companyRepository.findOneBy({ id });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOneBy({ id });
    this.companyRepository.merge(company, { ...updateCompanyDto, qutype: updateCompanyDto.qutype.sort((a, b) => a - b).join('-') });
    await this.companyRepository.save(company);
    // this.companyRepository.update(id, updateCompanyDto);
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }

  findIn(...ids: number[]) {
    return this.companyRepository.find({ where: { id: In(ids) } });
  }
}
