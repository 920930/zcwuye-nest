import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateCostDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  id: number;

  @IsNumber()
  price: number;

  @IsString()
  start?: string;

  @IsString()
  end?: string;

  @IsString()
  desc: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  contractId: number;

  @Transform(({ value }) => +value)
  @IsNumber()
  costypeId: number;
}
