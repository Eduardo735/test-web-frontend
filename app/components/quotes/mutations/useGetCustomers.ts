import { useApiBackendApplication } from "@/app/lib/axios/axios.interceptor";
import { useQuery } from "@tanstack/react-query";

export function useGetCustomers() {
    const api = useApiBackendApplication();

    const fetchCustomers = async () => {
        return await api.get(`/customer`).then((data) => {
            return data.data;
        });
    };

    return useQuery({ queryKey: ["customers"], queryFn: fetchCustomers });

}
