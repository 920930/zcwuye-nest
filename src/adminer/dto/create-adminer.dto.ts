import { IsPhoneNumber } from 'class-validator';

export class CreateAdminerDto {
  @IsPhoneNumber('CN')
  phone: string;
}
