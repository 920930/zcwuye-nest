import { IsNotEmpty, IsPhoneNumber, MinLength, MaxLength, IsBoolean, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateAdminerDto {
  @IsPhoneNumber('CN', { message: '请输入正确的手机号' })
  phone: string;

  @IsNotEmpty({ message: '姓名不能为空' })
  name: string;

  @MinLength(5, { message: '密码至少5位数' })
  @MaxLength(20, { message: '密码不能超过20位数' })
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @IsNotEmpty({ message: '确认密码不能为空' })
  pwd: string;

  // IsOptional 有则验证IsBoolean，无则不验证
  @IsOptional()
  @IsBoolean()
  state: boolean;

  @IsNumber()
  role: number;

  @IsArray()
  companies: number[];
}
