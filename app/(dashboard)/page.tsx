"use client";

import dynamic from "next/dynamic";
import ProtectedHeader from "../components/protected-header/protected-header";

const MapAreaSelector = dynamic(
  () => import("../components/map-area-selector/map-area-selector"),
  { ssr: false }
);

export default function LandingPage() {
  return (
    <div>
      <ProtectedHeader />
      <MapAreaSelector />
    </div>
  );
}
