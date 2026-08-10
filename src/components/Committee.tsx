"use client";

import { Download, FileText, Users } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

type Member = { name: string; role: string; tag: string; lead?: boolean };

// Organising committee — as presented on page 04 of the PYUC 2026 brochure.
const MEMBERS: Member[] = [
  { name: "Sani Lawal Dalhatu", role: "President, Soccer Link International & PYUC Chairman", tag: "Chairman", lead: true },
  { name: "Ibrahim Bello", role: "National Coordinator", tag: "NC" },
  { name: "Collins Ujuuchendu", role: "Project Development Director", tag: "PDD" },
  { name: "Bamu Gift", role: "Chief Technology Officer", tag: "CTO" },
  { name: "Urmar Sani Dayabu", role: "Public Relations Director", tag: "PRD" },
  { name: "Samson Siasia", role: "Project Ambassador", tag: "PA" },
  { name: "Bala Tokurah", role: "Finance & Admin Director", tag: "FAD" },
  { name: "Rose Uba Ifeakandu", role: "Project Secretary", tag: "PS" },
  { name: "Adeyemi Adebayo", role: "Project Treasurer", tag: "PT" },
  { name: "Yakubu Victor", role: "Social Media Manager", tag: "SMM" },
];

const BROCHURE = "/pyuc-brochure-2026.pdf";

export default function Committee() {
  return (
    <section id="committee" className="relative py-24 lg:py-32">
      <div className="absolute left-1/2 top-1/3 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-naija/12 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Leadership"
          title="Organising"
          accent="Committee"
          align="center"
          sub="Unanimous support for youth empowerment — the team delivering the Presidential Youth Unity Cup 2026 under the Office of the Presidency."
        />

        {/* Committee graphic */}
        <Reveal className="mt-14">
          <figure className="group relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-naija-dark shadow-premium">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/organising-committee.jpg"
              alt="PYUC 2026 Organising Committee — President Sani Lawal Dalhatu and the full leadership team"
              width={1280}
              height={905}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </figure>
        </Reveal>

        {/* Roster */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MEMBERS.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.04} className={m.lead ? "sm:col-span-2 lg:col-span-3" : ""}>
              <div
                className={`flex h-full items-center gap-4 rounded-2xl p-5 transition-all duration-300 ${
                  m.lead
                    ? "glass glass-gold"
                    : "glass hover:border-gold/25 hover:bg-white/[0.05]"
                }`}
              >
                <span
                  className={`grid shrink-0 place-items-center rounded-xl font-display uppercase ${
                    m.lead
                      ? "h-14 w-14 bg-gradient-to-br from-gold-soft to-gold-deep text-base text-ink"
                      : "h-12 w-12 border border-gold/25 bg-gold/10 text-xs text-gold"
                  }`}
                >
                  {m.tag}
                </span>
                <div className="min-w-0">
                  <div className="font-heading text-base uppercase tracking-wide text-cloud">
                    {m.name}
                  </div>
                  <div className="text-sm text-cloud/60">{m.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Brochure download */}
        <Reveal className="mt-14">
          <div className="flex flex-col items-center gap-6 rounded-3xl glass p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                <FileText className="h-7 w-7" />
              </span>
              <div>
                <div className="flex items-center gap-2 font-display text-xl uppercase text-cloud">
                  <Users className="hidden h-5 w-5 text-gold sm:block" /> PYUC 2026 Brochure
                </div>
                <p className="mt-1 text-sm text-cloud/60">
                  The full 6-page programme — vision, zones, format and the organising committee.
                </p>
              </div>
            </div>
            <a
              href={BROCHURE}
              download="PYUC-2026-Brochure.pdf"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gold px-8 py-4 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-all hover:bg-gold-soft hover:shadow-[0_0_45px_-6px_rgba(244,196,48,0.75)]"
            >
              <Download className="h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              Download Brochure
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
