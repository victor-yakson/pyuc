"use client";

import { CalendarDays, Clock, MapPin, Tv } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { ZONES, FCT } from "@/data/zones";
import { useLang } from "@/lib/i18n";

const byId = Object.fromEntries(ZONES.map((z) => [z.id, z]));
const teamOf = (id: string) =>
  id === "fct"
    ? { short: "FCT", team: FCT.team, color: FCT.color }
    : { short: byId[id].short, team: byId[id].team, color: byId[id].color };

const FIXTURES = [
  { home: "nw", away: "sw", date: "Sat 03 Oct", time: "16:00", venue: "MKO Abiola Stadium", stage: "Group A", odds: ["1.85", "3.40", "4.10"] },
  { home: "fct", away: "se", date: "Sun 04 Oct", time: "18:00", venue: "National Stadium, Abuja", stage: "Group A", odds: ["2.05", "3.10", "3.60"] },
  { home: "ne", away: "ss", date: "Wed 07 Oct", time: "16:00", venue: "Ahmadu Bello Stadium", stage: "Group B", odds: ["2.30", "3.20", "3.00"] },
  { home: "nc", away: "sw", date: "Sat 10 Oct", time: "19:00", venue: "Nnamdi Azikiwe Stadium", stage: "Group B", odds: ["2.60", "3.30", "2.70"] },
];

export default function Fixtures() {
  const { t } = useLang();
  return (
    <section id="fixtures" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={t("fixturesEyebrow")}
            title={t("fixturesTitle")}
            accent={t("fixturesAccent")}
            sub={t("fixturesSub")}
          />
          <Reveal>
            <a
              href="#register"
              className="rounded-full border border-white/15 px-6 py-3 font-heading text-xs uppercase tracking-[0.16em] text-cloud transition-colors hover:border-gold/50 hover:text-gold"
            >
              {t("fixturesFull")}
            </a>
          </Reveal>
        </div>

        <div className="mt-12 space-y-4">
          {FIXTURES.map((f, i) => {
            const home = teamOf(f.home);
            const away = teamOf(f.away);
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div className="group grid grid-cols-1 items-center gap-6 rounded-2xl glass p-5 transition-all duration-300 hover:border-gold/25 hover:bg-white/[0.05] lg:grid-cols-12 lg:p-6">
                  {/* meta */}
                  <div className="flex items-center gap-4 lg:col-span-3">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-white/10 bg-ink-2 text-center">
                      <div className="font-display text-lg leading-none text-gold">
                        {f.date.split(" ")[1]}
                      </div>
                      <div className="font-heading text-[9px] uppercase tracking-widest text-cloud/50">
                        {f.date.split(" ")[2]}
                      </div>
                    </div>
                    <div className="space-y-1 text-xs text-cloud/55">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {f.time} WAT
                      </div>
                      <span className="inline-block rounded-full bg-naija/20 px-2 py-0.5 font-heading text-[10px] uppercase tracking-widest text-naija-light">
                        {f.stage}
                      </span>
                    </div>
                  </div>

                  {/* teams */}
                  <div className="flex items-center justify-center gap-4 lg:col-span-5">
                    <div className="flex flex-1 items-center justify-end gap-3 text-right">
                      <span className="hidden font-heading text-sm uppercase tracking-wide text-cloud sm:inline">
                        {home.team}
                      </span>
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-lg font-display text-sm text-ink"
                        style={{ background: home.color }}
                      >
                        {home.short}
                      </span>
                    </div>
                    <span className="font-display text-lg text-cloud/40">VS</span>
                    <div className="flex flex-1 items-center gap-3">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-lg font-display text-sm text-ink"
                        style={{ background: away.color }}
                      >
                        {away.short}
                      </span>
                      <span className="hidden font-heading text-sm uppercase tracking-wide text-cloud sm:inline">
                        {away.team}
                      </span>
                    </div>
                  </div>

                  {/* venue */}
                  <div className="flex items-center gap-1.5 text-xs text-cloud/55 lg:col-span-2">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-naija-light" />
                    {f.venue}
                  </div>

                  {/* odds (sportsbook flavour) */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-3 gap-2">
                      {f.odds.map((o, j) => (
                        <div
                          key={j}
                          className="rounded-lg border border-white/10 bg-ink-2/60 py-2 text-center transition-colors group-hover:border-gold/30"
                        >
                          <div className="font-heading text-[9px] uppercase tracking-wider text-cloud/40">
                            {["1", "X", "2"][j]}
                          </div>
                          <div className="font-semibold text-cloud">{o}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-cloud/40">
            <Tv className="h-4 w-4" /> {t("fixturesFooter")} • <CalendarDays className="h-4 w-4" /> Grand Final · Dec 2026 · Eagle Stadium, Abuja
          </div>
        </Reveal>
      </div>
    </section>
  );
}
