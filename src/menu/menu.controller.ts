import { Controller, Get, Post, Body, Put, Param, Delete, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';

import { MenuService } from './menu.service';

import { CreateMenuPipe } from './pipes/create-menu.pipe';

import { Role } from '../app/decorator/role.decorator';
import { RoleType } from '../app/enum/role.enum';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Role(RoleType.SUPER)
  @Post()
  create(@Body(new CreateMenuPipe()) createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  findAll(@Query('companyId', new DefaultValuePipe(0), ParseIntPipe) companyId: number) {
    return this.menuService.findAll(companyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Role(RoleType.SUPER)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Role(RoleType.SUPER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
