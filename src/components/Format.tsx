"use client";

import { Flag, Users, Swords, Medal, Crown } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

const STAGES = [
  {
    icon: Flag,
    tag: "Stage 01",
    title: "Zonal Trials",
    date: "Aug – Sep 2026",
    body: "Open trials across all 774 LGAs select the finest young players to form each zone's squad.",
  },
  {
    icon: Users,
    tag: "Stage 02",
    title: "Group Stage",
    date: "Oct 2026",
    body: "Seven teams — six zones plus the FCT hosts — battle in a round-robin at the National Stadium.",
  },
  {
    icon: Swords,
    tag: "Stage 03",
    title: "Semi-Finals",
    date: "Nov 2026",
    body: "The top four advance to sudden-glory knockout ties broadcast live nationwide.",
  },
  {
    icon: Medal,
    tag: "Stage 04",
    title: "Third-Place",
    date: "Nov 2026",
    body: "A fierce clash for bronze and a place on the PYUC podium of honour.",
  },
  {
    icon: Crown,
    tag: "The Final",
    title: "Grand Final",
    date: "Dec 2026 · Eagle Stadium, Abuja",
    body: "One night, one trophy under the lights of the Eagle Stadium, Abuja — the Golden Champion is crowned before the nation and the Presidency.",
    gold: true,
  },
];

export default function Format() {
  const { t } = useLang();
  return (
    <section id="format" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t("formatEyebrow")}
          title={t("formatTitle")}
          accent={t("formatAccent")}
          align="center"
          sub={t("formatSub")}
        />

        <div className="relative mt-16">
          {/* connecting spine */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-naija to-gold lg:block" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STAGES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="relative h-full">
                  {/* node */}
                  <div
                    className={`relative z-10 mb-6 grid h-16 w-16 place-items-center rounded-2xl border transition-transform duration-300 hover:scale-105 ${
                      s.gold
                        ? "border-gold/40 bg-gradient-to-br from-gold-soft to-gold-deep text-ink ring-glow-gold"
                        : "border-white/10 bg-ink-2 text-naija-light"
                    }`}
                  >
                    <s.icon className="h-7 w-7" />
                  </div>

                  <div
                    className={`h-[calc(100%-5.5rem)] rounded-2xl p-6 ${
                      s.gold ? "glass glass-gold" : "glass"
                    }`}
                  >
                    <div
                      className={`font-heading text-[11px] uppercase tracking-[0.22em] ${
                        s.gold ? "text-gold" : "text-naija-light"
                      }`}
                    >
                      {s.tag}
                    </div>
                    <h3 className="mt-1 font-display text-2xl uppercase text-cloud">
                      {s.title}
                    </h3>
                    <div className="mt-1 text-xs font-semibold text-cloud/45">{s.date}</div>
                    <p className="mt-3 text-sm leading-relaxed text-cloud/65">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
