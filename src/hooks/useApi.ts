import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import useStorage from "@/hooks/useStorage";

interface FetchOptions extends AxiosRequestConfig {
}

const useApi = () => {
    const [storage] = useStorage();

    const fetchWithoutAuthentication = async (url: string, options: FetchOptions = {}): Promise<AxiosResponse> => {
        return axios({
            ...options,
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            url,
        });
    };

    const fetchWithAuthentication = async (url: string, options: FetchOptions = {}): Promise<AxiosResponse | undefined> => {
        if (!storage) return;

        const headers = {
            ...options.headers,
            Authorization: `Bearer ${storage.token}`,
        };

        return axios({
            ...options,
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            url,
            headers,
        });
    };

    return {fetchWithoutAuthentication, fetchWithAuthentication};
};

export default useApi;
