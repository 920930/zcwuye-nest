import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsPhoneNumber('CN')
  phone: string;

  @IsNotEmpty()
  card: string;

  @IsOptional()
  @IsBoolean()
  state?: boolean = true;

  @IsArray()
  companies: number[] = [];
}
