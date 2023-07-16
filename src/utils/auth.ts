import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {loginSuccess} from '@/store/actions/authentication';
import {RootState} from '@/store';

const useAuthentication = () => {
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.authentication.token);

    useEffect(() => {
        const login = async () => {
            try {
                // Faça a chamada para o endpoint de login e obtenha o token
                const response = await fetch('/api/login', {
                    method: 'POST',
                    body: JSON.stringify({username: 'seu_usuario', password: 'sua_senha'}),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // Despache a ação para armazenar o token no Redux
                    dispatch(loginSuccess(data.token));
                    // Armazene o token no local storage
                    localStorage.setItem('token', data.token);
                } else {
                    console.error('Erro ao fazer login');
                }
            } catch (error) {
                console.error('Erro ao fazer login', error);
            }
        };

        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            // Se houver um token no local storage, dispare a ação para armazená-lo no Redux
            dispatch(loginSuccess(storedToken));
        } else {
            login();
        }
    }, []);

    return token;
};

export default useAuthentication;
