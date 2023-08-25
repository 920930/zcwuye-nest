import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateContractDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  @Length(1, 6)
  name: string;

  @IsNotEmpty()
  userId: number;

  @IsString()
  rooms: string;

  @IsString()
  yyzz: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;
}
