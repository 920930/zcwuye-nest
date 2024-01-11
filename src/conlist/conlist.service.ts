import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { resolve } from 'node:path';
import { access, constants, unlinkSync } from 'node:fs';

import { Conlist } from './entities/conlist.entity';

import { CreateConlistDto } from './dto/create-conlist.dto';
import { UpdateConlistDto } from './dto/update-conlist.dto';

import { ContractService } from '../contract/contract.service';

@Injectable()
export class ConlistService {
  // 因为在model中已经使用forwardRef,这里不在需要这样了 @Inject(forwardRef(() => ContractService)) private contractService: ContractService,
  constructor(@InjectRepository(Conlist) private conlistRepository: Repository<Conlist>, private contractService: ContractService) {}
  async create(createConlistDto: CreateConlistDto) {
    Reflect.deleteProperty(createConlistDto, 'id');
    const contract = await this.contractService.findOneOnly(createConlistDto.contractId);
    const conlist = this.conlistRepository.create({ ...createConlistDto, contract });
    await this.conlistRepository.save(conlist);
    return 'This action adds a new conlist213';
  }

  async findAll(contractId: number, page = 1, size = 20) {
    return this.conlistRepository
      .createQueryBuilder('conlist')
      .where('conlist.contractId = :id', { id: contractId })
      .orderBy('conlist.id', 'DESC')
      .skip((page - 1) * size)
      .take(size)
      .getManyAndCount();
  }

  findOne(id: number) {
    return this.conlistRepository.findOneBy({ id });
    return `This action returns a #${id} conlist`;
  }

  async updateAndFile(id: number, files: string[]) {
    const con = await this.conlistRepository.findOneBy({ id });
    if (!con) {
      throw new ForbiddenException('不存在');
    }
    let imgs = [];
    if (con.imgs) {
      imgs = con.imgs.map((item) => {
        const arr = item.split('uploads');
        return `uploads${arr[1]}`;
      });
      files.unshift(...imgs);
    }
    await this.conlistRepository.update(id, { imgs: files });
    return `This action updates a #${id} conlist`;
  }

  async update(id: number, updateConlistDto: UpdateConlistDto) {
    Reflect.deleteProperty(updateConlistDto, 'contractId');
    await this.conlistRepository.update(id, updateConlistDto);
    return `This action updates a #${id} conlist`;
  }

  async remove(id: number, img = '') {
    if (img) {
      const conl = await this.conlistRepository.findOneBy({ id });
      const val = conl.imgs.filter((item) => item.includes(img));
      if (!val.length) return;
      // 删除数据库中的
      conl.imgs = conl.imgs.filter((item) => !item.includes(img));
      await this.conlistRepository.save(conl);
      // 删除本地物理路径图片
      const value = val[0].split('uploads')[1];
      const localPth = resolve(__dirname, '../../uploads' + value);
      access(localPth, constants.F_OK, (err) => {
        if (!err) unlinkSync(localPth);
      });
    } else {
      // await this.conlistRepository.delete(id);
    }
    return `This action removes a #${id} conlist`;
  }
}
