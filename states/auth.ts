import { atom, useSetRecoilState, useRecoilState, useResetRecoilState, selector } from 'recoil';

export const sessionAtom = atom({
    key: 'sessionAtom',
    default: null,
});
  
  export const logInLoadingAtom = atom({
    key: 'logInLoading',
    default: false,
  });
  
  export const logInErrorAtom = atom<string | null>({
    key: 'logInError',
    default: null,
  });
  
  export const resetLogInErrorAtom = atom<string | null>({
    key: 'resetLogInError',
    default: null,
  });
  