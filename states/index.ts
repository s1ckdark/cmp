import { atom, selector } from 'recoil';

export const monthAtom = atom<string>({
    key: 'month',
    default: ''
});

export const currentPageAtom = atom<number>({
    key: 'currentPageAtom',
    default: 1
});