import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  dong: string;

  @IsString()
  qu: string;

  @IsNumber()
  qutype: number;

  @IsBoolean()
  state: boolean;
}
