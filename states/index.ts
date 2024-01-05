import { get } from 'lodash';
import { atom, selector, selectorFamily, RecoilState } from 'recoil';
import { generateDates } from '@/utils/date';
import { getMonth } from '@/utils/date';
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
    get: ({ get }:{get:any}) => generateDates(get(monthAtom))
});

export const geneMonthDateAtom = atom<any>({
    key: 'geneMonthDate',
    default:generateDate
});

export const adjustedMonthSelector = selectorFamily({
    key: 'adjustedMonthSelector',
    get: (operation:string) => ({ get }) => {
      const currentMonth = get(monthAtom);
      return getMonth(currentMonth, operation);
    },
  });


  export const isOpenState: RecoilState<boolean> = atom({
    key: "isOpenState",
    default: false
  });
