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
    let parent: Menu | null = null;
    if (typeof info.parent === 'number') {
      parent = await this.menuRepository.findOneBy({ id: info.parent });
    }

    info.meta.roles.length === 0 && Reflect.deleteProperty(info.meta, 'roles');
    const menu = this.menuRepository.create({ ...info, parent });
    this.menuRepository.save(menu);
    return 'This action adds a new menu';
  }

  async findAll(companyId?: number) {
    const menus = await this.menuRepository.find({ relations: ['parent'] });
    if (companyId) {
      const menuFilter = menus.filter((menu) => new Set(menu.company).has(companyId));
      return menuTrees(menuFilter);
    }
    return menuTrees(menus);
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
