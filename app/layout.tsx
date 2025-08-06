import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient } from "@tanstack/react-query";
import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Turtles Traders",
  description: "Get started quickly Turtles Traders.",
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
      >
        <body className="min-h-[100dvh] bg-gray-50">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
