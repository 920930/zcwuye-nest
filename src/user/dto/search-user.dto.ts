import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Validate } from 'class-validator';
import { PhoneOrCardDto } from '../../app/dto/phoneOrCard';
export class SearchUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsPhoneNumber('CN')
  @Validate(PhoneOrCardDto, null, { message: '手机号不正确' })
  phone: string;

  @IsNotEmpty()
  page: number;

  @IsNotEmpty()
  size: number;
}
