"use client";

import { SocialFeedList } from "./social-feed-list";

export default function SocialFeed() {
  return (
    <div className="w-full mx-auto space-y-6 max-sm:w-3xs">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Social</h1>
        <p className="text-muted-foreground">
          Scroll down to automatically load more content
        </p>
      </div>
      <SocialFeedList />
    </div>
  );
}
