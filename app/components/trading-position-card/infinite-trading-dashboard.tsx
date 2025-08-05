import { Card, CardContent, CardHeader } from "@/app/components/ui/card";
import { Skeleton } from "@/app/components/ui/skeleton";
import React, { useCallback, useRef } from "react";
import { useInfiniteTradingSetups } from "./mutations/useInfiniteTradingSetups";
import { TradingCard } from "./trading-card";
import { TradingSetup } from "@/app/types/trading";
import ErrorFallback from "../error-fallback/error-fallback";
import EmptyState from "../empty-state/empty-state";

function SkeletonCard({ index }: { index: number }) {
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

export default function InfiniteTradingDashboard() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteTradingSetups();

  const [firstPage] = data?.pages || [];

  const total = firstPage?.data?.data.total;

  const observer = useRef<IntersectionObserver | null>(null);

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
    <ErrorFallback />
  ) : (
    <div className="w-2xl mx-auto p-2 space-y-6 max-sm:w-3xs max-sm:p-1">
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data?.data?.tradingSetups?.map(
            (setup: TradingSetup, idx: number, arr: []) => {
              const isLast =
                i === data.pages.length - 1 && idx === arr.length - 1;
              return (
                <div key={setup.id} ref={isLast ? lastElementRef : null}>
                  <TradingCard setup={setup} />
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
