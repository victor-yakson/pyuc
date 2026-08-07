import type { Metadata } from "next";
import { Anton, Oswald, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Presidential Youth Unity Cup (PYUC) 2026 — Nigeria",
  description:
    "One Nation. One Game. Six geo-political zones compete for the Golden Champion Trophy in the Presidential Youth Unity Cup (PYUC) — uniting Nigerian youth through football.",
  keywords: [
    "Presidential Youth Unity Cup",
    "PYUC",
    "Nigeria football tournament",
    "Nigerian youth sport",
    "geo-political zones",
    "Golden Champion Trophy",
  ],
  openGraph: {
    title: "Presidential Youth Unity Cup (PYUC) 2026",
    description:
      "Six zones. One Golden Champion Trophy. Uniting Nigerian youth through the beautiful Soccer.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
