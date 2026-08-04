"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

const REWARDS = [
  "The solid-gold Champion Trophy, held aloft before the nation",
  "₦150,000,000 zonal development grant",
  "Presidential honours & national broadcast recognition",
  "Direct scouting pathway to the Super Eagles setup",
  "Golden Boot, Golden Glove & Player of the Tournament awards",
];

function GoldTrophy() {
  return (
    <svg viewBox="0 0 220 300" className="h-full w-full drop-shadow-[0_25px_45px_rgba(244,196,48,0.35)]">
      <defs>
        <linearGradient id="goldBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff9e0" />
          <stop offset="0.4" stopColor="#ffd863" />
          <stop offset="0.72" stopColor="#f4c430" />
          <stop offset="1" stopColor="#c8961c" />
        </linearGradient>
        <linearGradient id="goldShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="plate" cx="0.5" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#1a1207" />
          <stop offset="1" stopColor="#0a0803" />
        </radialGradient>
      </defs>

      {/* Cup bowl */}
      <path
        d="M60 40 H160 V70 C160 118 138 150 110 150 C82 150 60 118 60 70 Z"
        fill="url(#goldBody)"
        stroke="#7a5a10"
        strokeWidth="1.5"
      />
      {/* rim */}
      <rect x="54" y="34" width="112" height="12" rx="6" fill="url(#goldBody)" stroke="#7a5a10" strokeWidth="1.2" />
      {/* handles */}
      <path d="M60 52 C30 52 30 96 62 100" fill="none" stroke="url(#goldBody)" strokeWidth="9" strokeLinecap="round" />
      <path d="M160 52 C190 52 190 96 158 100" fill="none" stroke="url(#goldBody)" strokeWidth="9" strokeLinecap="round" />

      {/* shine streak */}
      <path d="M78 48 H96 V132 C88 126 80 108 78 84 Z" fill="url(#goldShine)" opacity="0.6" />

      {/* stem */}
      <rect x="100" y="150" width="20" height="34" fill="url(#goldBody)" stroke="#7a5a10" strokeWidth="1.2" />
      {/* base tiers */}
      <path d="M76 184 H144 L134 208 H86 Z" fill="url(#goldBody)" stroke="#7a5a10" strokeWidth="1.2" />
      <rect x="66" y="208" width="88" height="16" rx="4" fill="url(#goldBody)" stroke="#7a5a10" strokeWidth="1.2" />
      <rect x="54" y="224" width="112" height="26" rx="6" fill="url(#plate)" stroke="#c8961c" strokeWidth="1.5" />

      {/* star on plate */}
      <path
        d="M110 230 l3.2 6.6 7.3 1 -5.3 5.1 1.3 7.2 -6.5 -3.4 -6.5 3.4 1.3 -7.2 -5.3 -5.1 7.3 -1 Z"
        fill="#f4c430"
      />
    </svg>
  );
}

export default function Trophy() {
  const { t } = useLang();
  return (
    <section id="trophy" className="relative overflow-hidden py-24 lg:py-32">
      {/* dramatic spotlight */}
      <div className="absolute left-1/2 top-8 -z-10 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gold/30 blur-[120px]" />
      <div className="absolute left-1/2 top-24 -z-10 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-gold/20 blur-[70px]" />

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Trophy visual */}
          <Reveal>
            <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center">
              {/* rotating halo */}
              <div className="absolute inset-8 rounded-full border border-gold/20" />
              <div className="absolute inset-0 animate-spin-slow rounded-full border-t-2 border-gold/40" />
              {/* sparkles */}
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full bg-gold"
                  style={{
                    top: `${20 + (i * 60) % 70}%`,
                    left: `${15 + (i * 37) % 75}%`,
                    animation: `float ${4 + i}s ease-in-out ${i * 0.4}s infinite`,
                    opacity: 0.7,
                  }}
                />
              ))}
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="h-[80%] w-[80%]"
              >
                <GoldTrophy />
              </motion.div>
            </div>
          </Reveal>

          {/* Copy + rewards */}
          <div>
            <SectionHeading
              eyebrow={t("trophyEyebrow")}
              title={t("trophyTitle")}
              accent={t("trophyAccent")}
              sub={t("trophySub")}
            />

            <div className="mt-8 space-y-3">
              {REWARDS.map((r, i) => (
                <Reveal key={r} delay={i * 0.07}>
                  <div className="flex items-start gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-4">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-ink">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="text-cloud/80">{r}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <a
                href="#register"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-all hover:bg-gold-soft hover:shadow-[0_0_45px_-6px_rgba(244,196,48,0.75)]"
              >
                {t("trophyCta")}
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
