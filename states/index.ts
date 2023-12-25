import { get } from 'lodash';
import { atom, selector } from 'recoil';

const getCurrentMonth = () => { return new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, '0')}

export const monthAtom = atom<string>({
    key: 'month',
    default: getCurrentMonth()
});

export const currentPageAtom = atom<number>({
    key: 'currentPageAtom',
    default: 1
});
