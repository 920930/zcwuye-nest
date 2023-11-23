import { IsNumber, IsString, IsEnum, IsOptional, IsArray } from 'class-validator';
import { RoleType } from '../../app/enum/role.enum';

export class CreateRoleDto {
  @IsNumber()
  id: number;

  @IsEnum(RoleType)
  name: RoleType;

  @IsString()
  title: string;

  // IsOptional 有则验证，无则不验证
  @IsOptional()
  @IsArray()
  permissions: number[];
}
