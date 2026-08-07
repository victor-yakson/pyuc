"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Shield, Star, TrendingUp } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import NigeriaMap from "./NigeriaMap";
import NigeriaFlag from "./NigeriaFlag";
import { ZONES, type Zone } from "@/data/zones";
import { useLang } from "@/lib/i18n";

// Position the 6 zones evenly around Abuja, the host capital, at the centre.
const NODES = ZONES.map((z, i) => {
  const angle = (-90 + i * 60) * (Math.PI / 180);
  return {
    zone: z,
    x: 50 + 39 * Math.cos(angle),
    y: 50 + 39 * Math.sin(angle),
  };
});

function FormPips({ form }: { form: Zone["form"] }) {
  const map = { W: "bg-naija-light", D: "bg-gold", L: "bg-white/25" };
  return (
    <div className="flex gap-1.5">
      {form.map((f, i) => (
        <span
          key={i}
          className={`grid h-6 w-6 place-items-center rounded-md text-[10px] font-bold text-ink ${map[f]}`}
        >
          {f}
        </span>
      ))}
    </div>
  );
}

export default function Zones() {
  const { t } = useLang();
  const [active, setActive] = useState<Zone>(ZONES[2]); // North West seeded #1
  const [view, setView] = useState<"map" | "orbit">("map");

  const toggleCls = (on: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-4 py-2 font-heading text-xs uppercase tracking-[0.14em] transition-colors ${
      on ? "bg-gold text-ink" : "border border-white/15 text-cloud/70 hover:text-gold"
    }`;

  return (
    <section id="zones" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-pitch opacity-30" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-naija/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t("zonesEyebrow")}
          title={t("zonesTitle")}
          accent={t("zonesAccent")}
          align="center"
          sub={t("zonesSub")}
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Map / Constellation */}
          <Reveal>
            <div>
              {/* view toggle */}
              <div className="mb-6 flex items-center justify-center gap-2">
                <button onClick={() => setView("map")} className={toggleCls(view === "map")}>
                  <MapPin className="h-4 w-4" /> {t("mapView")}
                </button>
                <button onClick={() => setView("orbit")} className={toggleCls(view === "orbit")}>
                  <Star className="h-4 w-4" /> {t("orbitView")}
                </button>
              </div>

              {view === "map" ? (
                <div className="mx-auto w-full max-w-[540px]">
                  <NigeriaMap
                    activeId={active.id}
                    onSelect={(id) => {
                      const z = ZONES.find((zz) => zz.id === id);
                      if (z) setActive(z);
                    }}
                  />
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-cloud/55">
                    <NigeriaFlag className="h-4 w-6" />
                    {t("mapCaption")}
                  </div>
                </div>
              ) : (
                <div className="relative mx-auto aspect-square w-full max-w-[520px]">
                  {/* connecting lines */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                {NODES.map((n) => {
                  const on = active.id === n.zone.id;
                  return (
                    <line
                      key={n.zone.id}
                      x1="50"
                      y1="50"
                      x2={n.x}
                      y2={n.y}
                      stroke={on ? "#f4c430" : "rgba(255,255,255,0.14)"}
                      strokeWidth={on ? 0.7 : 0.4}
                      vectorEffect="non-scaling-stroke"
                      strokeDasharray={on ? "0" : "1.5 1.5"}
                    />
                  );
                })}
              </svg>

              {/* orbit ring */}
              <div className="absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10 animate-spin-slow" />

              {/* Abuja — the host capital at the centre */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-gold-soft to-gold-deep text-center shadow-[0_0_60px_-8px_rgba(244,196,48,0.8)] sm:h-28 sm:w-28">
                  <span className="absolute inset-0 rounded-full border border-gold/40" style={{ animation: "pulse-ring 2.6s ease-out infinite" }} />
                  <div>
                    <div className="font-display text-xl text-ink sm:text-2xl">ABUJA</div>
                    <div className="font-heading text-[9px] font-bold uppercase tracking-widest text-ink/70">
                      Host Capital
                    </div>
                  </div>
                </div>
              </div>

              {/* zone nodes */}
              {NODES.map((n) => {
                const on = active.id === n.zone.id;
                return (
                  <button
                    key={n.zone.id}
                    onClick={() => setActive(n.zone)}
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    aria-label={n.zone.name}
                  >
                    <span
                      className={`grid h-16 w-16 place-items-center rounded-full border transition-all duration-300 sm:h-[4.6rem] sm:w-[4.6rem] ${
                        on
                          ? "scale-110 border-transparent"
                          : "border-white/15 bg-ink-2/80 hover:scale-105 hover:border-white/40"
                      }`}
                      style={
                        on
                          ? {
                              background: `radial-gradient(circle at 30% 30%, ${n.zone.color}, ${n.zone.color}22)`,
                              boxShadow: `0 0 34px -4px ${n.zone.glow}`,
                            }
                          : undefined
                      }
                    >
                      <span className="text-center">
                        <span
                          className="block font-display text-lg leading-none"
                          style={{ color: on ? "#04120a" : n.zone.color }}
                        >
                          {n.zone.short}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
                </div>
              )}
            </div>
          </Reveal>

          {/* Details panel */}
          <Reveal delay={0.1}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl glass p-8 shadow-premium"
                style={{ boxShadow: `0 30px 80px -50px ${active.glow}` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      className="font-heading text-xs uppercase tracking-[0.28em]"
                      style={{ color: active.color }}
                    >
                      {active.name}
                    </div>
                    <h3 className="mt-1 font-display text-3xl uppercase text-cloud sm:text-4xl">
                      {active.team}
                    </h3>
                  </div>
                  <div
                    className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl font-display text-2xl text-ink"
                    style={{ background: active.color }}
                  >
                    {active.short}
                  </div>
                </div>

                <p className="mt-4 leading-relaxed text-cloud/70">{active.blurb}</p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-ink-2/50 p-4">
                    <div className="flex items-center gap-2 text-cloud/50">
                      <Shield className="h-4 w-4" />
                      <span className="font-heading text-[10px] uppercase tracking-widest">
                        Captain
                      </span>
                    </div>
                    <div className="mt-1 font-semibold text-cloud">{active.captain}</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-ink-2/50 p-4">
                    <div className="flex items-center gap-2 text-cloud/50">
                      <Star className="h-4 w-4" />
                      <span className="font-heading text-[10px] uppercase tracking-widest">
                        Seed
                      </span>
                    </div>
                    <div className="mt-1 font-semibold text-cloud">#{active.seed} Ranked</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 bg-ink-2/50 p-4">
                  <div className="flex items-center gap-2 text-cloud/50">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-heading text-[10px] uppercase tracking-widest">
                      Recent Form
                    </span>
                  </div>
                  <FormPips form={active.form} />
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center gap-2 text-cloud/50">
                    <MapPin className="h-4 w-4" />
                    <span className="font-heading text-[10px] uppercase tracking-widest">
                      {active.states.length} States Represented
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.states.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cloud/75"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
