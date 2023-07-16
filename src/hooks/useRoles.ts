import useApi from './useApi';

interface Role {
    _id: string;
    name: string;
}

const useRoles = () => {
    const {fetchWithoutAuthentication} = useApi();

    const getRoles = async (): Promise<Role[]> => {
        try {
            const response = await fetchWithoutAuthentication('/users/roles', {method: 'GET'});

            if (response.status === 200) {
                return response.data;
            } else {
                console.error('Erro ao buscar as roles.');
                return [];
            }
        } catch (error) {
            console.error('Erro ao buscar as roles.', error);
            return [];
        }
    };

    return {getRoles};
};

export default useRoles;
