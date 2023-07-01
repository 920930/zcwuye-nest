import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { AdminerService } from '../adminer/adminer.service';
import { menuTrees } from '../app/utils';

@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private menuRepository: Repository<Menu>, private adminerService: AdminerService) {}
  async create(info: CreateMenuDto) {
    const menu = this.menuRepository.create(info);
    if (info.parentId) {
      menu.parent = await this.menuRepository.findOneBy({ id: info.parentId });
      menu.path = menu.path.includes('/') ? menu.path.slice(1) : menu.path;
    } else {
      menu.path = menu.path.includes('/') ? menu.path : `/${menu.path}`;
    }
    this.menuRepository.save(menu);
    return 'This action adds a new menu';
  }

  async findAll(companyId?: number) {
    const menus = await this.menuRepository.find({ relations: ['parent'] });
    console.log(menus);
    if (companyId) {
      const menuFilter = menus.filter((menu) => new Set(menu.company).has(companyId));
      return menuFilter;
    }
    return menus;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu123`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
