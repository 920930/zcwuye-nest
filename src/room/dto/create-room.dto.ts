import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  id: number;

  @IsNumber()
  dong: number;

  @IsNotEmpty()
  qu: string;

  @IsNotEmpty()
  num: string;

  @IsNumber()
  area: number;

  @IsNumber()
  price: number;

  @IsNumber()
  companyId: number;
}
