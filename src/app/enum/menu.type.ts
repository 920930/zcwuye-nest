import { RoleType } from './role.enum';

export type TMeta = {
  locale: string;
  requiresAuth: boolean;
  roles?: RoleType[];
  hideInMeu?: boolean;
  icon?: string;
  order?: number;
};
