// utils/recoilPersist.ts
import { atom, RecoilState } from 'recoil';
import { recoilPersist } from "recoil-persist";
import { Token } from '@/types/auth';

const localStorage = typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
    key: 'toeknState',
    storage: localStorage
  });


export const tokenState: RecoilState<Token> = atom({
    key: 'token',
    default: '',
    effects_UNSTABLE: [persistAtom]
});