import { useAuth } from '@clerk/nextjs';
import axios from 'axios';

export const useApiBackendApplication = () => {
    const { getToken } = useAuth();
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL_BACKEND,
    });

    instance.interceptors.request.use(async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return instance;
};
