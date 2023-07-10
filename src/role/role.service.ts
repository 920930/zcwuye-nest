import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {}
  async create(createRoleDto: CreateRoleDto) {
    const one = await this.roleRepository.findOneBy({ name: createRoleDto.name });
    if (one) throw new ForbiddenException(`${createRoleDto.name}已存在`);
    Reflect.deleteProperty(createRoleDto, 'id');
    const role = this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(role);
    return 'This action adds a new role';
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    return await this.roleRepository.findOneBy({ id });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.roleRepository.update(id, updateRoleDto);
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
