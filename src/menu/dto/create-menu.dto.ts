import { IsArray, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';
import { TMenu } from '../../app/enum/menu.type';

export class CreateMenuDto {
  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  meta: TMenu;

  @IsArray({ message: '请选择公司' })
  company: number[];

  @IsNumber()
  @ValidateIf((obj, val) => val != null)
  parentId?: number | null;
}
