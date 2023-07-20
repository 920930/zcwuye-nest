import { ArgumentMetadata, ForbiddenException, Injectable, PipeTransform } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class PhoneCardPipe implements PipeTransform {
  constructor(private userService: UserService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const one = await this.userService.findPhoneCard(value.phone, value.card);
    if (metadata.metatype.name === 'CreateUserDto') {
      if (one.length) throw new ForbiddenException('手机号或身份证已存在');
    }
    if (metadata.metatype.name === 'UpdateUserDto') {
      const bool = one.some((item) => item.id !== value.id);
      if (bool) throw new ForbiddenException('手机号或身份证已存在');
    }
    return value;
  }
}
