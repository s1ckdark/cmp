import { atom, selector } from 'recoil';

export const authState = atom({
    key: 'authState',
    default: null,
});

export const logInLoadingAtom = atom({
    key: 'logInLoading',
    default: false,
});

export const logInErrorAtom = atom({
    key: 'logInError',
    default: null,
});

export const resetLogInErrorAtom = atom({
    key: 'resetLogInError',
    default: null,
});

// Define atoms for signup state
export const signUpLoadingAtom = atom({
    key: 'signUpLoading',
    default: false,
});

export const signUpErrorAtom = atom({
    key: 'signUpError',
    default: null,
});

export const resetSignUpErrorAtom = atom({
    key: 'resetSignUpError',
    default: null,
});

export const showPasswordAtom = atom({
    key: 'showPassword',
    default: false,
});
