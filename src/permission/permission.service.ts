import { ForbiddenException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>,
    @Inject(forwardRef(() => RoleService)) private roleService: RoleService,
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const one = await this.permissionRepository.findOneBy({ name: createPermissionDto.name });
    if (one) throw new ForbiddenException(`${one.name}已存在`);
    Reflect.deleteProperty(createPermissionDto, 'id');
    const permission = this.permissionRepository.create(createPermissionDto);
    await this.permissionRepository.save(permission);
    return 'This action adds a new permission';
  }

  findAll() {
    return this.permissionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  findIn(...ids: number[]) {
    return this.permissionRepository.find({ where: { id: In(ids) } });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const one = await this.permissionRepository.findOneBy({ name: updatePermissionDto.name });
    if (one.id !== id) throw new ForbiddenException(`${one.name}已存在`);
    this.permissionRepository.update(id, updatePermissionDto);
    return `This action updates a #${id} permission`;
  }

  async remove(id: number) {
    // 在关联数据表中关联删除onDElete: true
    await this.permissionRepository.delete(id);
    return `This action removes a #${id} permission`;
  }
}
