import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '../enum/role.enum';
import { ROLE_KEY } from '../decorator/role.decorator';
import { AdminerService } from '../../adminer/adminer.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private adminerService: AdminerService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(ROLE_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) return true;
    const { adminer } = context.switchToHttp().getRequest();
    const one = await this.adminerService.findOne(adminer.id);
    return requiredRoles.includes(one.role.name);
  }
}
