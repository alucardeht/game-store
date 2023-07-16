import {useRouter} from 'next/router';
import {useEffect} from 'react';
import useAuthentication from '../utils/auth';

const ProtectedPage = ({children}: { children: JSX.Element }) => {
    const token = useAuthentication();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/login');
        }
    }, [token]);

    if (!token) {
        return null;
    }

    return (
        {children}
    );
};

export default ProtectedPage;
