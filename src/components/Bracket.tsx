"use client";

import { Crown, Trophy } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { ZONES, FCT } from "@/data/zones";
import { useLang } from "@/lib/i18n";

const byId = Object.fromEntries(ZONES.map((z) => [z.id, z]));
const team = (id: string) =>
  id === "fct"
    ? { short: FCT.short, name: FCT.team, color: FCT.color }
    : { short: byId[id].short, name: byId[id].team, color: byId[id].color };

type Side = { id: string; score?: number };
type SemiMatch = { tag: string; home: Side; away: Side };

// Semi-finals have been played — the final & third-place auto-advance from these results.
const SEMIS: SemiMatch[] = [
  { tag: "Semi-Final 1 · Dec 06", home: { id: "nw", score: 2 }, away: { id: "sw", score: 1 } },
  { tag: "Semi-Final 2 · Dec 07", home: { id: "fct", score: 1 }, away: { id: "ne", score: 3 } },
];

const winnerId = (m: SemiMatch) =>
  (m.home.score ?? 0) >= (m.away.score ?? 0) ? m.home.id : m.away.id;
const loserId = (m: SemiMatch) =>
  (m.home.score ?? 0) >= (m.away.score ?? 0) ? m.away.id : m.home.id;

type Slot = { id?: string; label?: string; score?: number; winner?: boolean };

function TeamRow({ slot }: { slot: Slot }) {
  if (!slot.id) {
    return (
      <div className="flex items-center gap-3 px-4 py-3 opacity-60">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-dashed border-white/20 text-[10px] text-cloud/40">
          ?
        </span>
        <span className="font-heading text-sm uppercase tracking-wide text-cloud/40">
          {slot.label}
        </span>
      </div>
    );
  }
  const tm = team(slot.id);
  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${slot.winner ? "bg-gold/10" : ""}`}>
      <span
        className="grid h-8 w-8 shrink-0 place-items-center rounded-md font-display text-xs text-ink"
        style={{ background: tm.color }}
      >
        {tm.short}
      </span>
      <span className="flex-1 truncate font-heading text-sm uppercase tracking-wide text-cloud">
        {tm.name}
      </span>
      {slot.winner && (
        <span className="rounded-full bg-gold/20 px-2 py-0.5 font-heading text-[9px] uppercase tracking-widest text-gold">
          Q
        </span>
      )}
      <span className={`font-display text-lg ${slot.winner ? "text-gold" : "text-cloud/45"}`}>
        {slot.score ?? "–"}
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
  home: Slot;
  away: Slot;
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
      <TeamRow slot={home} />
      <div className="mx-4 h-px bg-white/8" />
      <TeamRow slot={away} />
    </div>
  );
}

export default function Bracket() {
  const { t } = useLang();

  const finalHome = winnerId(SEMIS[0]);
  const finalAway = winnerId(SEMIS[1]);
  const thirdHome = loserId(SEMIS[0]);
  const thirdAway = loserId(SEMIS[1]);

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

        <div className="mt-16 grid items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
          {/* Semi-finals (played) */}
          <Reveal className="space-y-10">
            {SEMIS.map((m) => {
              const w = winnerId(m);
              return (
                <Match
                  key={m.tag}
                  tag={m.tag}
                  home={{ id: m.home.id, score: m.home.score, winner: w === m.home.id }}
                  away={{ id: m.away.id, score: m.away.score, winner: w === m.away.id }}
                />
              );
            })}
          </Reveal>

          {/* Final — auto-advanced winners */}
          <Reveal delay={0.1} className="flex flex-col items-center gap-6">
            <div className="hidden h-16 w-px bg-gradient-to-b from-transparent to-gold/40 lg:block" />
            <div className="w-full max-w-xs lg:w-80">
              <Match
                tag="Grand Final · Dec 14"
                home={{ id: finalHome }}
                away={{ id: finalAway }}
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

        {/* Third place — auto-advanced losers */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-12 max-w-md overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-2 border-b border-white/8 px-5 py-2.5 text-cloud/50">
              <Trophy className="h-4 w-4 shrink-0" />
              <span className="font-heading text-[10px] uppercase tracking-[0.2em]">
                {t("bkThirdTag")}
              </span>
            </div>
            <TeamRow slot={{ id: thirdHome }} />
            <div className="mx-4 h-px bg-white/8" />
            <TeamRow slot={{ id: thirdAway }} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
