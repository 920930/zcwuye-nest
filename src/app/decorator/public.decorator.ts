import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TAdminer } from '../enum/typings';
// 设定无token路由
export const IS_PUBLIC = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC, true);
// 获取用户
export const ReqAdminer = createParamDecorator((data, ctx: ExecutionContext): TAdminer => {
  const req = ctx.switchToHttp().getRequest<Request>();
  const adminer: TAdminer = req['adminer'];
  return adminer;
});
