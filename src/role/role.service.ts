import { Injectable, ForbiddenException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Role } from './entities/role.entity';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @Inject(forwardRef(() => PermissionService)) private permissionService: PermissionService,
  ) {}
  async create(createRoleDto: CreateRoleDto) {
    const one = await this.roleRepository.findOneBy({ name: createRoleDto.name });
    if (one) throw new ForbiddenException(`${createRoleDto.name}已存在`);
    Reflect.deleteProperty(createRoleDto, 'id');
    // 权限列表
    const permissions = await this.permissionService.findIn(...(createRoleDto.permissions ?? []));
    const role = this.roleRepository.create({ ...createRoleDto, permissions });
    // this.roleRepository.merge(role, { permissions });
    await this.roleRepository.save(role);
    return 'This action adds a new role';
  }

  findAll() {
    return this.roleRepository.find({ relations: { permissions: true } });
  }

  async findOne(id: number) {
    return await this.roleRepository.findOneBy({ id });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepository.findOne({ where: { id } });
    // 权限列表
    const permissions = await this.permissionService.findIn(...(updateRoleDto.permissions ?? []));
    this.roleRepository.merge(role, { ...updateRoleDto, permissions });
    await this.roleRepository.save(role);
    return `This action updates a #${id} role`;
  }

  async findIn(...ids: number[]) {
    return await this.roleRepository.find({ where: { id: In(ids) } });
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
