import { IsString, IsNotEmpty, Length, IsOptional, IsDecimal } from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  @Length(1, 6)
  name: string;

  @IsString()
  bianma: string;

  @IsDecimal()
  area: number;

  @IsDecimal()
  price: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  companyId: number;

  @IsOptional()
  @IsString()
  rooms: string;

  @IsString()
  yyzz: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}
