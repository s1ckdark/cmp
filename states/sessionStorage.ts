// utils/recoilPersist.ts
import { atom, RecoilState } from 'recoil';
import { recoilPersist } from "recoil-persist";
import { User } from '@/types/user.d';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined
const { persistAtom } = recoilPersist({
    key: 'recoil',
    storage: sessionStorage
});

interface UserInfoAtom {
    [key: string]: any;
    default: User;
}


export const recoil: RecoilState<UserInfoAtom> = atom({
    key: "userInfo",
    default: null,
    effects_UNSTABLE: [persistAtom]
})
