import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';

import { IS_PUBLIC } from '../decorator/public.decorator';

import { AdminerService } from '../../adminer/adminer.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector, private configService: ConfigService, private adminerService: AdminerService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [context.getHandler(), context.getClass()]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.tokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync<{ id: number; name: string }>(token, {
        secret: this.configService.get<string>('JwtSecret'),
      });
      const adminer = await this.adminerService.findOne(payload.id);
      if (!adminer) throw new ForbiddenException('您已被限制登录');
      request['adminer'] = adminer;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private tokenFromHeader(request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
