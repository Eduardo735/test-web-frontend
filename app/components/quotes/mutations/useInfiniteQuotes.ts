import { useInfiniteQuery } from "@tanstack/react-query";
import { useApiBackendApplication } from "@/app/lib/axios/axios.interceptor";

export function useInfiniteQuotesPagination() {
    const api = useApiBackendApplication();

    const fetchQuotes = async ({ pageParam }: any) => {
        return await api.get(`/quote?offset=${pageParam}&limit=${10}`).then(data => {
            return {
                ...data,
                limit: 10,
                page: pageParam || 1,
                offset: pageParam && pageParam > 0 ? pageParam * 10 : 0,
            };
        })
    }

    return useInfiniteQuery({
        queryKey: ['quotes'],
        queryFn: fetchQuotes,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = lastPage ? lastPage.page + 1 : 1;
            return nextPage;
        },
    });

}
