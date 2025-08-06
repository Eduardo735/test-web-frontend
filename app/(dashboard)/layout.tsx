import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test exam",
  description: "Get started with text exam",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col min-h-screen">{children}</section>;
}
