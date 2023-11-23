import { IsNumber, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  title: string;
}
