import useApi from "@/hooks/useApi";

interface Genre {
    id: string;
    name: string;
}

const useGenres = () => {
    const {fetchWithoutAuthentication} = useApi();

    const getGenres = async () => {
        try {
            const response = await fetchWithoutAuthentication('/games/genres', {method: 'GET'});
            return response.data;
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    return {getGenres};
};

export default useGenres;
