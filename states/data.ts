import { atom, selector } from 'recoil';
import { apiBe } from '@/services';

interface fetchData {
    data: any[];
    memberNo: string;
    targetMonth: string;
}

export const dataState = atom<fetchData | null>({
    key: 'dataState',
    default: null,
});

interface dataViewType {
    data: any[];
    memberNo?: string;
    targetMonth?: string;
}

interface dataListType {
    totalPages: number;
    totalItems?: number;
    data: any[];
}
export const dataViewAtom = atom<dataViewType | null>({
    key: 'dataViewAtom',
    default: {data:[], memberNo:'', targetMonth:''}
});

export const dataListAtom = atom<dataListType | null>({
    key: 'dataListAtom',
    default: {data:[], totalPages:0}
});

export const visualAtom = atom<any | null>({
    key: 'visualAtom',
    default: null,
});

export const historyListAtom = atom<any | null>({
    key: 'historyListAtom',
    default: {data:[], totalPages:0, currentPage:0}
});

export const historyToggleAtom = atom<boolean>({
    key: 'historyToggleAtom',
    default: false,
});

