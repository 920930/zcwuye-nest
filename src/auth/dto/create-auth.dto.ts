import { IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  password: string;
}
