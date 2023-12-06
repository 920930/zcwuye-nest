import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Adminer } from '../../adminer/entities/adminer.entity';
// 设定无token路由
export const IS_PUBLIC = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC, true);
// 获取用户
export const ReqAdminer = createParamDecorator((data, ctx: ExecutionContext): Adminer => {
  const req = ctx.switchToHttp().getRequest<Request>();
  // 注意这里承接，管道auth.guard.ts中设置的数据
  return req['adminer'];
});
