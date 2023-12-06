import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCostypeDto {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsBoolean()
  state: boolean;
}
