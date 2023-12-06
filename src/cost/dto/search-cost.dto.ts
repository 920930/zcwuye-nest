import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchCostDto {
  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  contractId: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  costypeId = 0;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  page = 1;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  size = 20;
}
