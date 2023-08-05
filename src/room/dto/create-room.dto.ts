import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNumber()
  dong?: number = 0;

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
