import { RoleType } from './role.enum';

export type TMenu = {
  locale: string;
  requiresAuth: boolean;
  roles?: RoleType[];
  hideInMeu?: boolean;
  icon?: string;
  order?: number;
};
