import { IsNumber, IsOptional, IsPhoneNumber, IsString, Validate } from 'class-validator';
import { PhoneOrCardDto } from '../../app/dto/phoneOrCard';
import { Transform } from 'class-transformer';

export class SearchContractDto {
  @Transform(({ value }) => +value)
  @IsNumber()
  companyId: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsOptional()
  @IsPhoneNumber('CN')
  @Validate(PhoneOrCardDto, null, { message: '手机号不正确' })
  userphone: string;

  @Transform(({ value }) => +value)
  @IsNumber()
  page = 1;

  @Transform(({ value }) => +value)
  @IsNumber()
  size = 10;
}
