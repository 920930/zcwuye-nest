import { Injectable, HttpException, ForbiddenException } from '@nestjs/common';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

import { CreateAuthDto } from './dto/create-auth.dto';
import { AdminerService } from 'src/adminer/adminer.service';
@Injectable()
export class AuthService {
  constructor(private adminerService: AdminerService, private jwt: JwtService) {}
  async login(info: CreateAuthDto) {
    const adminer = await this.adminerService.findByPhone(info.phone);
    if (!adminer) throw new HttpException('管理员不存在或被禁止', 400);
    const bool = await verify(adminer.password, info.password);
    if (!bool) throw new ForbiddenException('管理员手机或者密码错误');
    const token = await this.jwt.signAsync({ id: adminer.id, name: adminer.name });
    return `Bearer ${token}`;
  }

  logout() {
    return `This action returns all auth`;
  }
}
