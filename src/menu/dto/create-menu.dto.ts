import { IsArray, IsNotEmpty, Validate } from 'class-validator';
import { ParentDto } from './parent.dto';
import { TMeta } from '../../app/enum/menu.type';
import { Menu } from '../entities/menu.entity';

export class CreateMenuDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  meta: TMeta;

  @IsArray({ message: '请选择公司' })
  company: number[];

  @Validate(ParentDto)
  // @Validate(ParentDto, null, { message: '不能为空'})
  parent?: number | Menu | null;
}
