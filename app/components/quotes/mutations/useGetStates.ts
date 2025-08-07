import { useApiBackendApplication } from "@/app/lib/axios/axios.interceptor";
import { useQuery } from "@tanstack/react-query";

export function useGetStates() {
    const api = useApiBackendApplication();

    const fetchStates = async () => {
        return await api.get(`/state`).then((data) => {
            return data.data;
        });
    };

    return useQuery({ queryKey: ["states"], queryFn: fetchStates });

}
