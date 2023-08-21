import { IsString, IsNotEmpty, Length, IsPhoneNumber, Validate } from 'class-validator';
import { PhoneOrCardDto } from '../../app/dto/phoneOrCard';

export class CreateContractDto {
  @IsNotEmpty()
  id: number;

  @IsString()
  @Length(1, 6)
  name: string;

  @IsPhoneNumber()
  @Validate(PhoneOrCardDto)
  phone: string;

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
