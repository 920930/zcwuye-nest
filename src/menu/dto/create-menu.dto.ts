import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { TMeta } from '../../app/enum/menu.type';
import { Menu } from '../entities/menu.entity';

export class CreateMenuDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  meta: TMeta;

  @IsArray({ message: '请选择公司' })
  company: number[];

  @IsNumber()
  parent?: number | Menu | null;
}
