import {atom, useAtom} from 'jotai';
import {useEffect} from 'react';
import {COOKIE_NAME, getCookieValue, setCookieValue} from '@/store/persistConfig';
import {User} from "@/hooks/useAuth";

interface Storage {
    token?: string;
    user?: User;
}

const localStorageAtom = atom<Storage | undefined>(undefined);

const useStorage = () => {
    const [value, setValue] = useAtom(localStorageAtom);

    useEffect(() => {
        const storedValue = getCookieValue(COOKIE_NAME);
        if (storedValue) {
            setValue(storedValue);
        }
    }, []);

    const setStorage = (newValue: Storage) => {
        setValue(newValue);
        setCookieValue(COOKIE_NAME, newValue);
    };

    const clearStorage = () => {
        setValue(undefined);
        setCookieValue(COOKIE_NAME, undefined);
    };

    return [value, setStorage, clearStorage] as const;
};

export default useStorage;
