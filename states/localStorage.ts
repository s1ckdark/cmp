import { atom, selector } from 'recoil';
import { recoilPersist } from "recoil-persist";
import { apiBe } from '@/services/index';

// Define the shape of the user profile data
interface UserProfile {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  activated: boolean;
  addr: string;
  addrDetail: string;
  authorities: string[]; // Assuming it's an array of strings
  credentialsNonExpired: boolean;
  email: string;
  enabled: boolean;
  id: string;
  lastLogDt: string; // Consider using Date type if manipulating as date
  memberName: string;
  memberNo: string;
  mobile: string;
  modDt: string | null; // Date as string or null
  modId: string | null;
  modName: string | null;
  phone: string;
  privileges: string[]; // Assuming it's an array of strings
  regDt: string; // Consider using Date type if manipulating as date
  regId: string;
  regName: string;
  roles: string[] | null; // Assuming it's an array of strings or null
  salesName: string;
  userFullName: string;
  userType: string;
  username: string;
  zipcode: string;
}

// If using server-side rendering, check if window is defined
const localStorage = typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'cmp',
  storage: localStorage
});

// Apply the UserProfile interface to the atom
export const userProfileAtom = atom({
  key: 'userProfile',
  default: null,
  effects_UNSTABLE: [persistAtom]
});

