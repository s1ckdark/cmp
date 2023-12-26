import { get } from 'lodash';
import { atom, selector } from 'recoil';
import { generateDates } from '@/utils/date';
const getCurrentMonth = () => { return new Date().getFullYear().toString() + (new Date().getMonth() + 1).toString().padStart(2, '0')}

export const monthAtom = atom<string>({
    key: 'month',
    default: getCurrentMonth()
});

export const currentPageAtom = atom<number>({
    key: 'currentPageAtom',
    default: 1
});

const generateDate = selector({
    key: 'generateDate',
    get: async({get}: any) => {
        return generateDates(get);
    }
});

export const geneMonthDateAtom = atom<any>({
    key: 'geneMonthDate',
    default:generateDates
});