import { RoleType } from './RoleType';

export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: RoleType
};
