"use client";

import ReportFeedList from "./report-feed-list";

export default function Reports() {
  return (
    <div className="w-2xl mx-auto space-y-6 max-sm:w-3xs">
      <div className="text-center mb-8 ">
        <h1 className="text-3xl font-bold mb-2">Reports</h1>
        <p className="text-muted-foreground">
          Scroll down to automatically load more content
        </p>
      </div>
      <ReportFeedList />
    </div>
  );
}
