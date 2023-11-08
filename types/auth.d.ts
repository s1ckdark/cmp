import { ValueOf } from '@/types/index.d';
export interface Token {
    userId: string;
    accessToken: string;
    refreshToken: string;
}

export interface User {
    userId: string;
    accessToken: string;
    refreshToken: string;
  };

export const ROLE = {
    ADMIN: 'ADMIN',
    SUPPORTER: 'SUPPORTER',
    USER: 'USER',
    BLOCKED: 'BLOCKED',
} as const;

export type RoleTypes = ValueOf<typeof ROLE>;

export interface UserWithRole extends User {
    role: RoleTypes;
}