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
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["quotes"] });
            try {
                const res = await fetch("/api/send-quote", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ "message": "publish from next" }),
                });

                if (!res.ok) {
                    console.error("Fail send to nest js");
                } else {
                    console.log("Send to nestjs");
                }
            } catch (err) {
                console.error("Fail to call endpoint:", err);
            }
        }
    });

}