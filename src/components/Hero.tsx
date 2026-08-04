"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, ArrowRight, MapPin, ChevronDown } from "lucide-react";
import { HERO_VIDEO, IMG } from "@/data/zones";
import { useLang } from "@/lib/i18n";
import { useTrailer } from "./TrailerModal";
import NigeriaFlag from "./NigeriaFlag";

const KICKOFF = new Date("2026-10-01T16:00:00+01:00"); // Independence Day kickoff

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

export default function Hero() {
  const cd = useCountdown(KICKOFF);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(true);
  const { t } = useLang();
  const { open: openTrailer } = useTrailer();

  const units = [
    { v: cd.d, l: t("uDays") },
    { v: cd.h, l: t("uHrs") },
    { v: cd.m, l: t("uMin") },
    { v: cd.s, l: t("uSec") },
  ];

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden">
      {/* Background: poster (always) + video (progressive enhancement) */}
      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 animate-kenburns bg-cover bg-center"
          style={{ backgroundImage: `url(${IMG.heroPoster})` }}
        />
        {videoOk && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
            poster={IMG.heroPoster}
            onError={() => setVideoOk(false)}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/40 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-pitch opacity-40" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pt-28 pb-20 lg:grid-cols-12 lg:px-8">
        {/* Left: headline */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5"
          >
            <NigeriaFlag className="h-4 w-6 rounded-[3px]" />
            <span className="font-heading text-xs uppercase tracking-[0.28em] text-gold">
              {t("heroBadge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display text-[clamp(3rem,9vw,7.5rem)] uppercase leading-[0.86] text-cloud"
          >
            {t("heroTitle1")}
            <br />
            <span className="text-gradient-gold">{t("heroTitle2")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cloud/75"
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#register"
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-all hover:bg-gold-soft hover:shadow-[0_0_45px_-6px_rgba(244,196,48,0.75)]"
            >
              {t("ctaPrimary")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={openTrailer}
              className="group inline-flex items-center gap-3 rounded-full border border-white/20 px-7 py-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-cloud transition-all hover:border-gold/50 hover:bg-white/5"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-naija text-cloud transition-transform group-hover:scale-110">
                <Play className="h-4 w-4 translate-x-[1px]" fill="currentColor" />
              </span>
              {t("ctaSecondary")}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex items-center gap-3 text-sm text-cloud/60"
          >
            <MapPin className="h-4 w-4 text-naija-light" />
            {t("location")}
          </motion.div>
        </div>

        {/* Right: countdown card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5"
        >
          <div className="glass-gold rounded-3xl border border-white/10 bg-ink-2/85 p-7 shadow-premium backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="font-heading text-xs uppercase tracking-[0.22em] text-gold">
                {t("cdTitle")}
              </span>
              <span className="rounded-full bg-naija/20 px-3 py-1 font-heading text-[11px] uppercase tracking-widest text-naija-light">
                Oct 1, 2026
              </span>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-3">
              {units.map((u) => (
                <div
                  key={u.l}
                  className="rounded-2xl border border-white/10 bg-ink-2/60 py-4 text-center"
                >
                  <div className="font-display text-3xl text-cloud sm:text-4xl">
                    {String(u.v).padStart(2, "0")}
                  </div>
                  <div className="mt-1 font-heading text-[10px] uppercase tracking-[0.2em] text-cloud/50">
                    {u.l}
                  </div>
                </div>
              ))}
            </div>

            <div className="my-6 h-px divider-line" />

            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { n: "7", l: t("sTeams") },
                { n: "36", l: t("sStates") },
                { n: "₦250M", l: t("sPrize") },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl text-gradient-gold">{s.n}</div>
                  <div className="font-heading text-[10px] uppercase tracking-[0.16em] text-cloud/50">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cloud/50 hover:text-gold md:flex"
      >
        <span className="font-heading text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
