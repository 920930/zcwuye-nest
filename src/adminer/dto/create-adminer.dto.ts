import { IsNotEmpty, IsPhoneNumber, MinLength, MaxLength, IsBoolean, IsArray, IsInt } from 'class-validator';
import { Company } from '../../company/entities/company.entity';

export class CreateAdminerDto {
  @IsPhoneNumber('CN', { message: '请输入正确的手机号' })
  phone: string;

  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;

  @IsNotEmpty()
  @MinLength(5, { message: '密码至少5位数' })
  @MaxLength(20, { message: '密码不能超过20位数' })
  password: string;

  @IsBoolean()
  state: boolean;

  @IsInt()
  roleId: number;

  @IsArray()
  companies: Company[];
}
