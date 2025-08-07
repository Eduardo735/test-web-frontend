import { useApiBackendApplication } from "@/app/lib/axios/axios.interceptor";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useMutationsSaveQuote() {
    const api = useApiBackendApplication();
    const queryClient = useQueryClient()

    const fetchQuotes = async ({ data }: any) => {
        return await api.post(`/quote`, data).then(data => {
            return data.data
        })
    }

    return useMutation({
        mutationFn: (newTodo) => {
            return fetchQuotes({ data: newTodo });
        },
        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: ["quotes"] });
            return {}
        }
    });

}