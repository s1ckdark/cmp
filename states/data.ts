import { atom, selector, selectorFamily } from 'recoil';
import { apiBe } from '@/services';
import { IaddrData } from '@/types/data';
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
    params?: any;
    mode?: string;
    currentPage: number;
    totalElements: number;
    totalPages: number;
    data: any[];
}
export const dataViewAtom = atom<dataViewType | null>({
    key: 'dataViewAtom',
    default: {data:[], memberNo:'', targetMonth:''}
});

export const dataListAtom = atom<dataListType>({
    key: 'dataListAtom',
    default: { mode:'',params: {}, data:[], totalPages:0,currentPage:1, totalElements:0}
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

export const searchAtom = atom<any>({
    key: 'searchAtom',
    default: {keyword:'', excute: false }
});


export const userInfoAtom = atom<any>({
    key: 'userInfoAtom',
    default: null
});

export const addrAtom = atom<IaddrData>({
    key: 'addrAtom',
    default: {
        id: '',
        name: '',
        addr: '',
        addrDetail: '',
        zipcode: ''
    }
});

export const memberAtom = atom<any>({
    key: 'memberAtom',
    default: { memberNo: '', memberName: '' }
});

export const customerStep = atom<number>({
    key: 'customerStep',
    default: 0
});


export const fileUploadAtom = atom<any>({
    key: 'fileIploadAtom',
    default: []
});

export const clientSessionAtom = atom<string>({
    key: 'clientSessionAtom',
    default: ''
});

interface IProdType {
    id: string;
    prodType: string;
    prodDetailType: string;
    prodDetailTypeStd: string;
}
export const prodTypeAtom = atom<IProdType>({
    key: 'prodTypeAtom',
    default: { id: '', prodType: '',  prodDetailType: '', prodDetailTypeStd: '' }
});

interface ICustomerPageType {
    pageType: 'register' | 'view' | 'edit';
}
export const pageTypeAtom = atom<string>({
    key: 'pageTypeAtom',
    default: ''
});