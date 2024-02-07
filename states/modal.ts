import { atom, selector, selectorFamily } from 'recoil';

interface IModalList {
    modalType: string;
    keyword: string;
    data: any[],
    totalPages: number;
    currentPage: number;
}

export const modalListAtom = atom<IModalList>({
    key: 'modalListAtom',
    default: {
        modalType: '',
        keyword: '',
        data: [],
        totalPages: 0,
        currentPage: 1,
    }
});
