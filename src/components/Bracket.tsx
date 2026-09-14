"use client";

import { Crown, Trophy, Info } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

// Registration phase — no matches have been played, so every slot is still open.
function Slot({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-dashed border-white/25 text-[11px] text-cloud/40">
        ?
      </span>
      <span className="font-heading text-sm uppercase tracking-wide text-cloud/55">
        {label}
      </span>
    </div>
  );
}

function Match({
  tag,
  home,
  away,
  gold = false,
}: {
  tag: string;
  home: string;
  away: string;
  gold?: boolean;
}) {
  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border ${
        gold ? "border-gold/40 ring-glow-gold" : "border-white/10"
      } bg-ink-2/70`}
    >
      <div
        className={`flex items-center justify-between px-4 py-2 font-heading text-[10px] uppercase tracking-[0.2em] ${
          gold ? "bg-gold/15 text-gold" : "bg-white/5 text-cloud/50"
        }`}
      >
        <span>{tag}</span>
      </div>
      <Slot label={home} />
      <div className="mx-4 h-px bg-white/8" />
      <Slot label={away} />
    </div>
  );
}

export default function Bracket() {
  const { t } = useLang();
  const tbd = t("bkTbd");

  return (
    <section id="bracket" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-pitch opacity-20" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t("bracketEyebrow")}
          title={t("bracketTitle")}
          accent={t("bracketAccent")}
          align="center"
          sub={t("bracketSub")}
        />

        {/* Registration-phase note */}
        <Reveal>
          <div className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-5 py-2.5 text-center">
            <Info className="h-4 w-4 shrink-0 text-gold" />
            <span className="font-heading text-[11px] uppercase tracking-[0.16em] text-gold">
              {t("bkPhaseNote")}
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* Semi-finals */}
          <Reveal className="space-y-10">
            <Match tag="Semi-Final 1 · Dec 2026" home={tbd} away={tbd} />
            <Match tag="Semi-Final 2 · Dec 2026" home={tbd} away={tbd} />
          </Reveal>

          {/* Final */}
          <Reveal delay={0.1} className="flex flex-col items-center gap-6">
            <div className="hidden h-16 w-px bg-gradient-to-b from-transparent to-gold/40 lg:block" />
            <div className="w-full max-w-xs lg:w-80">
              <Match
                tag="Grand Final · Dec 2026"
                home={t("bkWinnerSf1")}
                away={t("bkWinnerSf2")}
                gold
              />
            </div>
            <div className="hidden h-16 w-px bg-gradient-to-t from-transparent to-gold/40 lg:block" />
          </Reveal>

          {/* Champion */}
          <Reveal delay={0.2}>
            <div className="mx-auto flex max-w-xs flex-col items-center gap-4 rounded-3xl glass glass-gold p-8 text-center">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-gold-soft to-gold-deep text-ink">
                <Crown className="h-8 w-8" />
              </div>
              <div className="font-heading text-[11px] uppercase tracking-[0.24em] text-gold">
                {t("bkChampionOf")}
              </div>
              <div className="font-display text-3xl uppercase text-cloud">
                {t("bkToBeCrowned")}
              </div>
              <p className="text-sm text-cloud/60">{t("bkChampionNote")}</p>
            </div>
          </Reveal>
        </div>

        {/* Third place */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-2 border-b border-white/8 px-5 py-2.5 text-cloud/50">
              <Trophy className="h-4 w-4 shrink-0" />
              <span className="font-heading text-[10px] uppercase tracking-[0.2em]">
                {t("bkThirdTag")}
              </span>
            </div>
            <Slot label={t("bkLoserSf1")} />
            <div className="mx-4 h-px bg-white/8" />
            <Slot label={t("bkLoserSf2")} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
