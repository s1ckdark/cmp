import { ValueOf } from '@/types/index.d';
export interface User {
    userId: string;
    accessToken: string;
    refreshToken: string;
  };

export const Privileges = {
    admin: 'admin',
    tech: 'tech',
    sale: 'sale',
    customer: 'customer'
} as const;

export type PrivilegeTypes = ValueOf<typeof Privileges>;

export interface UserWithPrivileges extends User {
    privileges: PrivilegeTypes[];
}