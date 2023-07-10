import { IsNumber, IsString, IsEnum } from 'class-validator';
import { RoleType } from '../../app/enum/role.enum';

export class CreateRoleDto {
  @IsNumber()
  id: number;

  @IsEnum(RoleType)
  name: RoleType;

  @IsString()
  title: string;
}
