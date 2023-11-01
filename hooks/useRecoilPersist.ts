// hooks/useRecoilPersist.ts
import { useRecoilState } from 'recoil';
import { localStorageAtom, LocalStorageAtomState } from '@/utils/recoilPersist';

function useRecoilPersist<T>(key: string, defaultValue: T) {
    const [storedValue, setStoredValue] = useRecoilState<LocalStorageAtomState>(localStorageAtom);
    const value = storedValue[key] || defaultValue;

    const setValue = (newValue: T) => {
        setStoredValue({ ...storedValue, [key]: newValue });
    };

    return [value, setValue] as const;
}

export default useRecoilPersist;
