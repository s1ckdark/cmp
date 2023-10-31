// utils/recoilPersist.ts
import { atom, RecoilState } from 'recoil';
import { recoilPersist } from "recoil-persist";

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined
const { persistAtom } = recoilPersist({
    key: 'recoil-persist',
    storage: sessionStorage
});

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

interface LocalStorageAtomState {
    [key: string]: any;
}
interface token {
    key: string;
    value: string;
}
export const tokenState: RecoilState<token> = atom({
    key: "tokenState",
    default: { userId: '', accesstoken: '', refreshtoken: '' },
    effects_UNSTABLE: [persistAtom]
})

export const localStorageAtom: RecoilState<LocalStorageAtomState> = atom({
    key: 'localStorageAtom',
    default: {},
    effects_UNSTABLE: [
        localStorageEffect('localStorageAtom')
    ]
});
