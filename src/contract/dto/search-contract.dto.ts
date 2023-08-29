// import { IsString, IsNotEmpty, Length } from 'class-validator';
import { IsString } from 'class-validator';
import { SearchUserDto } from '../../user/dto/search-user.dto';

export class SearchContractDto extends SearchUserDto {
  @IsString()
  companyId: string;
}
