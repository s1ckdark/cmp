import { atom, useSetRecoilState, useRecoilState, useResetRecoilState, selector } from 'recoil';

export const authState = atom({
    key: 'authState',
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
  
  // Define atoms for signup state
  export const signUpLoadingAtom = atom({
    key: 'signUpLoading',
    default: false,
  });
  
export const signUpErrorAtom = atom<string | null>({
    key: 'signUpError',
    default: null,
});
  
  export const resetSignUpErrorAtom = atom<string | null>({
    key: 'resetSignUpError',
    default: null,
  });