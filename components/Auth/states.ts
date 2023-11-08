import { atom } from 'recoil';

export const authModalStateAtom = atom<'login' | 'signup' | undefined>({
  key: 'authModalState', // unique ID (with respect to other atoms/selectors)
  default: undefined, // default value (aka initial value)
});

export const showPasswordAtom = atom<boolean>({
  key: 'showPasswordState',
  default: false,
});
