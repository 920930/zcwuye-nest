import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../enum/role.enum';

export const ROLE_KEY = 'role';
export const Role = (...args: RoleType[]) => SetMetadata(ROLE_KEY, args);
