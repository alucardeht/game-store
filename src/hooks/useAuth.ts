import useApi from './useApi';
import {useRouter} from 'next/router';
import useStorage from "@/hooks/useStorage";

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface LoginResponse {
    token: string;
    user: User;
}

interface LoginData {
    email: string;
    password: string;
}

const useAuth = () => {
    const {fetchWithoutAuthentication} = useApi();
    const router = useRouter();
    const [, setStorage, clearStorage] = useStorage();

    const loginUser = async (loginData: LoginData) => {
        try {
            const {email, password} = loginData;
            const response = await fetchWithoutAuthentication('/users/login', {
                method: 'POST',
                data: {email, password},
            });

            if (response.status === 200) {
                const data: LoginResponse = response.data;
                const {token, user} = data;

                setStorage({token, user});

                await router.push({pathname: '/success', query: {redirectTo: '/'}});
            } else {
                console.error('Erro ao autenticar usuário.');
            }
        } catch (error) {
            console.error('Erro ao autenticar usuário.', error);
        }
    };

    const logoutUser = async () => {
        clearStorage();

        await router.push('/');
    };

    return {loginUser, logoutUser};
};

export default useAuth;
