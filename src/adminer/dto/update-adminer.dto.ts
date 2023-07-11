import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminerDto } from './create-adminer.dto';
import { IsNotEmpty, MaxLength, MinLength, IsOptional } from 'class-validator';

export class UpdateAdminerDto extends PartialType(CreateAdminerDto) {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(5, { message: '密码至少5位数' })
  @MaxLength(20, { message: '密码不能超过20位数' })
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  pwd?: string;
}
