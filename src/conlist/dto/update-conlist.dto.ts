import { PartialType } from '@nestjs/mapped-types';
import { CreateConlistDto } from './create-conlist.dto';

export class UpdateConlistDto extends PartialType(CreateConlistDto) {}
