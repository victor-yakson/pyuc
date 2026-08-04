"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/lib/i18n";
import { TrailerProvider } from "./TrailerModal";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <TrailerProvider>{children}</TrailerProvider>
    </LanguageProvider>
  );
}
