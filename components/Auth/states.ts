import { atom, useRecoilValue, useResetRecoilState } from 'recoil';

export const authModalAtom = atom<'login' | 'signup' | undefined>({
  key: 'authModal',
  default: undefined,
});

export const showPasswordAtom = atom<boolean>({
  key: 'showPassword',
  default: true,
});

export const logInLoadingAtom = atom<boolean>({
  key: 'logInLoading',
  default: false,
});

export const logInErrorAtom = atom<string>({
  key: 'logInError',
  default: '',
});

export const signUpLoadingAtom = atom<boolean>({
  key: 'signUpLoading',
  default: false,
});

export const signUpErrorAtom = atom<string>({
  key: 'signUpError',
  default: '',
});