import { atom, selector } from 'recoil';
// import { user } from '@/types/user';


// Define your auth state atom
export const authState = atom({
    key: 'authState',
    default: null,
});

// export const userState = atom<user>({
//     key: 'userInfo',
//     default: {
//         userId: '',
//         accesstoken: '',
//         refreshtoken: ''
//     },
//     effects_UNSTABLE: [persistAtom],
// });

// Define atoms for login state
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
