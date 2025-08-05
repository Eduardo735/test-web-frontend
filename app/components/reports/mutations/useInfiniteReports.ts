import { useInfiniteQuery } from "@tanstack/react-query";
import { useApiBackendApplication } from "@/app/lib/axios/axios.interceptor";

export function useInfiniteReportsPagination() {
    const api = useApiBackendApplication();

    const fetchReports = async ({ pageParam }: any) => {
        return await api.get(`/report?offset=${pageParam}&limit=${10}`).then(data => {
            return {
                ...data,
                limit: 10,
                page: pageParam || 1,
                offset: pageParam && pageParam > 0 ? pageParam * 10 : 0,
            };
        })
    }

    return useInfiniteQuery({
        queryKey: ['report'],
        queryFn: fetchReports,
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            const nextPage = lastPage ? lastPage.page + 1 : 1;
            return nextPage;
        },
    });

}
