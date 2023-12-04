import { PartialType } from '@nestjs/mapped-types';
import { CreateCostypeDto } from './create-costype.dto';

export class UpdateCostypeDto extends PartialType(CreateCostypeDto) {}
