import { atom } from 'recoil';
import { fetchData } from '@/types/data';

export const dataState = atom<fetchData | null>({
    key: 'dataState',
    default: null,
});