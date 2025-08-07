"use client";

import { Quote } from "@/app/types/report";
import React, { useCallback, useRef } from "react";
import EmptyState from "../empty-state/empty-state";
import ErrorFallback from "../error-fallback/error-fallback";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { useInfiniteQuotesPagination } from "./mutations/useInfiniteQuotes";
import ViewQuotes from "./view-quotes";

export function SkeletonCard({ index }: { index: number }) {
  return (
    <Card key={`skeleton-${index}`}>
      <CardHeader>
        <div className="space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex gap-4 flex-wrap">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function QuoteList() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuotesPagination();

  const [firstPage] = data?.pages || [];

  const total = firstPage?.data?.data.total;

  const observer = useRef<IntersectionObserver>(undefined);
  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return status === "pending" ? (
    Array.from([1, 2, 3]).map((_, index) => (
      <div
        key={index}
        className="w-2xl mx-auto p-2 space-y-6 max-sm:w-3xs max-sm:p-1"
      >
        <SkeletonCard index={index} />
      </div>
    ))
  ) : status === "error" ? (
    <ErrorFallback onRetry={refetch} />
  ) : (
    <div className="w-2xl mx-auto p-2 space-y-6 max-sm:w-3xs max-sm:p-1">
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data?.data?.quotes?.map(
            (quotes: Quote, idx: number, arr: []) => {
              const isLast =
                i === data.pages.length - 1 && idx === arr.length - 1;
              return (
                <div key={quotes.id} ref={isLast ? lastElementRef : null}>
                  <div className="max-w-4xl my-2 mx-auto p-6 space-y-6 border solid rounded-lg w-full max-sm:flex flex-wrap">
                    <div className="text-center space-y-2"></div>
                    <Card key={quotes.id} className="max-sm:w-3xs">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <CardTitle className="text-xl">
                              <CardTitle>
                                Cliente: {quotes?.customer?.name}
                              </CardTitle>
                              <CardDescription>
                                Id: {quotes?.id}
                                <br />
                                Estado: {quotes?.land.state?.name}
                              </CardDescription>
                            </CardTitle>
                            <CardDescription className="flex flex-wrap items-center gap-4 text-sm"></CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ViewQuotes
                          open={true}
                          dataInput={quotes?.land?.dataLand}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            }
          )}
        </React.Fragment>
      ))}
      {isFetchingNextPage
        ? Array.from([1, 2, 3]).map((_, index) => (
            <div key={index}>
              <SkeletonCard index={index} />
            </div>
          ))
        : null}
      {!hasNextPage && (
        <div className="text-center text-muted-foreground py-4">
          No more reports to show.
        </div>
      )}
      {total === 0 && <EmptyState />}
      {error && <EmptyState />}
    </div>
  );
}
