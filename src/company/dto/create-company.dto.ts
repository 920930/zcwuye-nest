import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsNumber()
  dong: number;

  @IsString()
  qu: string;

  @IsArray()
  qutype: number[];

  @IsNumber()
  qulen: number;

  @IsBoolean()
  state: boolean;
}
