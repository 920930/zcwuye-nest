import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { menuTrees } from '../app/utils';

@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private menuRepository: Repository<Menu>) {}
  async create(info: CreateMenuDto) {
    let parent: Menu | null = null;
    if (typeof info.parent === 'number') {
      parent = await this.menuRepository.findOneBy({ id: info.parent });
    }
    if (info.meta.roles && info.meta.roles.length === 0) {
      Reflect.deleteProperty(info.meta, 'roles');
    }
    Reflect.deleteProperty(info, 'id');
    const menu = this.menuRepository.create({ ...info, parent });
    this.menuRepository.save(menu);
    return 'This action adds a new menu';
  }

  async findAll(companyId?: number) {
    const menus = await this.menuRepository.find({ relations: ['parent'] });
    let data: Menu[] = [];
    if (companyId) {
      const menuFilter = menus.filter((menu) => new Set(menu.company).has(companyId));
      data = menuTrees(menuFilter);
    } else {
      data = menuTrees(menus);
    }
    data.forEach((item) => item.children.sort((a, b) => b.meta.order - a.meta.order));
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    // const menu = await this.menuRepository.findOne({ where: { id }, relations: ['parent'] });
    let parent: Menu | null = null;
    if (typeof updateMenuDto.parent === 'number') {
      parent = await this.menuRepository.findOneBy({ id: updateMenuDto.parent });
    }
    updateMenuDto.meta.roles.length === 0 && Reflect.deleteProperty(updateMenuDto.meta, 'roles');
    await this.menuRepository.update(id, { ...updateMenuDto, parent });
    // this.menuRepository.merge(menu, { ...updateMenuDto, parent });
    return 'ok';
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
