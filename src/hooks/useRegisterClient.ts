import useApi from './useApi';
import {useRouter} from "next/router";
import useRoles from "@/hooks/useRoles";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    imaDeveloper: boolean;
}

const useRegisterClient = () => {
    const {fetchWithoutAuthentication} = useApi();
    const {getRoles} = useRoles();
    const router = useRouter();

    const registerClient = async (registerData: RegisterData) => {
        try {
            const {name, email, password, confirmPassword, imaDeveloper} = registerData;
            const roles = await getRoles();
            const roleId = roles.find(role => role.name === (imaDeveloper ? 'Developer' : 'Client'))?._id;
            const response = await fetchWithoutAuthentication('/users/register', {
                method: 'POST',
                data: {name, email, password, confirmPassword, roleId},
            });

            if (response.status === 200) {
                router.push({pathname: '/success', query: {redirectTo: '/login'}});
            } else {
                console.error('Erro ao registrar cliente.');
            }
        } catch (error) {
            console.error('Erro ao registrar cliente.', error);
        }
    };

    return {registerClient};
};

export default useRegisterClient;
