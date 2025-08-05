"use client";

import InfiniteTradingDashboard from "./infinite-trading-dashboard";

export default function TradingDashboard() {
  return (
    <div className="w-2xl mx-auto space-y-6 max-sm:w-3xs">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Trading Setups</h1>
        <p className="text-muted-foreground">
          Scroll down to automatically load more content
        </p>
      </div>
      <InfiniteTradingDashboard />
    </div>
  );
}
