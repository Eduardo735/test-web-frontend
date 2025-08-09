"use client";

import { Suspense } from "react";

import { cn } from "@/app/lib/utils";
import { JoinCommunity } from "../user-detail/join-community";
import { UserAvatarInfo } from "../user-detail/user-avatar-info";
import styles from "./protected-header.module.css";

export default function ProtectedHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-black/95">
      <div className={cn(styles.container, "flex justify-between")}>
        <div className="flex justify-between items-center py-4 px-2 gap-2">
          <span className="text-white font-bold text-lg pb-1">✍️</span>
          <span className="text-xl font-bold text-slate-900">Test Exam</span>
        </div>
        <div className="md:flex justify-between items-center py-4 px-2 gap-4">
          <Suspense fallback={<div className="h-9" />}>
            <JoinCommunity />
            <UserAvatarInfo />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
