import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConlistDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsString()
  desc: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  contractId: number;
}
