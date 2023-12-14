// utils/recoilPersist.ts
import { atom, RecoilState } from 'recoil';

interface LocalStorageEffectParams {
    setSelf: (newValue: any) => void;
    onSet: (callback: (newValue: any) => void) => void;
}

const localStorageEffect = (key: string) => ({ setSelf, onSet }: LocalStorageEffectParams) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet(newValue => {
        localStorage.setItem(key, JSON.stringify(newValue));
    });
};

export interface LocalStorageAtomState {
    [key: string]: any;
}

export const localStorageAtom: RecoilState<LocalStorageAtomState> = atom({
    key: 'localStorageAtom',
    default: {},
    effects_UNSTABLE: [
        localStorageEffect('localStorageAtom')
    ]
});
