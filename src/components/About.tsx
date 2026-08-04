"use client";

import { HeartHandshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import CountUp from "./CountUp";
import { IMG } from "@/data/zones";
import { useLang } from "@/lib/i18n";

export default function About() {
  const { t } = useLang();

  const PILLARS = [
    { icon: Users, title: t("pRepresentation"), body: t("pRepresentationBody") },
    { icon: HeartHandshake, title: t("pUnity"), body: t("pUnityBody") },
    { icon: ShieldCheck, title: t("pOpportunity"), body: t("pOpportunityBody") },
    { icon: Sparkles, title: t("pLegacy"), body: t("pLegacyBody") },
  ];

  const STATS = [
    { to: 7, suffix: "", label: t("stZonalTeams") },
    { to: 36, suffix: "", label: t("stStates") },
    { to: 774, suffix: "", label: t("stLGAs") },
    { to: 200, suffix: "M+", label: t("stDream") },
  ];

  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Text */}
          <div>
            <SectionHeading
              eyebrow={t("aboutEyebrow")}
              title={t("aboutTitle")}
              accent={t("aboutAccent")}
              sub={t("aboutSub")}
            />

            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="group h-full rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30">
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-naija/20 text-naija-light transition-colors group-hover:bg-gold/20 group-hover:text-gold">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold uppercase tracking-wide text-cloud">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-cloud/60">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <Reveal delay={0.15}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-premium">
                <div
                  className="aspect-[4/5] bg-cover bg-center bg-naija-dark transition-transform duration-700 hover:scale-105"
                  style={{ backgroundImage: `url(${IMG.celebrate})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="font-display text-2xl uppercase text-cloud">
                    Where champions <span className="text-gradient-gold">rise</span>
                  </div>
                </div>
              </div>

              {/* floating badge */}
              <div className="absolute -left-4 -top-4 hidden animate-float rounded-2xl glass glass-gold p-4 sm:block">
                <div className="font-display text-3xl text-gradient-gold">#1</div>
                <div className="font-heading text-[10px] uppercase tracking-widest text-cloud/60">
                  Youth Initiative
                </div>
              </div>

              <div
                className="absolute -bottom-6 -right-4 hidden aspect-square w-40 overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center shadow-premium sm:block"
                style={{ backgroundImage: `url(${IMG.youth})` }}
              />
            </div>
          </Reveal>
        </div>

        {/* Stats bar */}
        <Reveal delay={0.1}>
          <div className="mt-20 grid grid-cols-2 gap-6 rounded-3xl glass p-8 md:grid-cols-4 lg:p-10">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-4xl text-cloud lg:text-5xl">
                  <CountUp to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-heading text-xs uppercase tracking-[0.18em] text-naija-light">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
