import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, Validate } from 'class-validator';
import { PhoneOrCardDto } from './phoneOrCard.dto';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsPhoneNumber('CN')
  // @Validate(PhoneDto, null, { message: '手机号不正确' })
  @Validate(PhoneOrCardDto)
  phone: string;

  @IsNotEmpty()
  @Validate(PhoneOrCardDto)
  card: string;

  @IsOptional()
  @IsBoolean()
  state?: boolean = true;

  @IsArray()
  companies: number[] = [];
}
