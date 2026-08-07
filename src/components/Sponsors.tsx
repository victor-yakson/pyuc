"use client";

import { Landmark } from "lucide-react";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

const PARTNERS: { name: string; sub?: string }[] = [
  { name: "Federal Ministry of Youth" },
  { name: "Nigeria Football Federation" },
  { name: "National Sports Commission" },
  { name: "Ministry of Sports Dev." },
  { name: "Soccer Link International", sub: "FIFA Licensed Player Agent" },
  { name: "Naija Unity Bank" },
];

export default function Sponsors() {
  const { t } = useLang();
  return (
    <section className="relative border-y border-white/10 bg-ink-2/40 py-16">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-gold/25 bg-gold/5 px-5 py-2">
              <Landmark className="h-5 w-5 text-gold" />
              <span className="font-heading text-xs uppercase tracking-[0.28em] text-gold">
                {t("sponsorsAuspices")}
              </span>
            </div>
            <p className="max-w-xl font-heading text-sm uppercase tracking-[0.18em] text-cloud/45">
              {t("sponsorsPartners")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center justify-center gap-1 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-6 text-center font-heading text-xs uppercase tracking-wide text-cloud/50 transition-colors hover:border-white/20 hover:text-cloud/80"
              >
                <span>{p.name}</span>
                {p.sub && (
                  <span className="text-[10px] tracking-wide text-gold/70">
                    {p.sub}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
