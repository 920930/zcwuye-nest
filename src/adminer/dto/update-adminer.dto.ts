import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminerDto } from './create-adminer.dto';

export class UpdateAdminerDto extends PartialType(CreateAdminerDto) {}
