"use client";

import ProtectedHeader from "../components/protected-header/protected-header";
import Quotes from "../components/quotes/quotes";
import QuoteList from "../components/quotes/quote-list";

export default function LandingPage() {
  return (
    <div>
      <ProtectedHeader />
      <Quotes />
      <QuoteList />

      {/* <Quotes />
      <MapAreaSelector /> */}
    </div>
  );
}
