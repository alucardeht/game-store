import useApi from "@/hooks/useApi";

interface OperatingSystem {
    id: string;
    name: string;
}

const useOperatingSystems = () => {
    const {fetchWithoutAuthentication} = useApi();

    const getOperatingSystems = async () => {
        try {
            const response = await fetchWithoutAuthentication('/games/operating-systems', {method: 'GET'});
            return response.data;
        } catch (error) {
            console.error('Error fetching operating systems:', error);
        }
    };

    return {getOperatingSystems};
};

export default useOperatingSystems;
