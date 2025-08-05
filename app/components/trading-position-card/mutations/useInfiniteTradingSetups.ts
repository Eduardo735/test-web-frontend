import { useInfiniteQuery } from "@tanstack/react-query";
import { useApiBackendApplication } from "@/app/lib/axios/axios.interceptor";

export function useInfiniteTradingSetups() {
    const api = useApiBackendApplication();

    const fetchProjects = async ({ pageParam }: any) => {
        return await api.get(`/trading-setup?offset=${pageParam}&limit=${10}`).then(data => {

            return {
                ...data,
                limit: 10,
                page: pageParam || 1,
                offset: pageParam && pageParam > 0 ? pageParam * 10 : 0,
            };
        })
    }

    return useInfiniteQuery({
        queryKey: ['trading-setup'],
        queryFn: fetchProjects,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            console.log('lastPage, pages :>> ', lastPage, pages);
            const nextPage = lastPage ? lastPage.page + 1 : 1;
            return nextPage;
        },
    });

}
