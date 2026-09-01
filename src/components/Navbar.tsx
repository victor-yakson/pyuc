"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, Trophy, Globe, Check } from "lucide-react";
import Logo from "./Logo";
import { LANGS, useLang } from "@/lib/i18n";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useLang();

  const LINKS = [
    { href: "#about", label: t("navMission") },
    { href: "#zones", label: t("navZones") },
    { href: "#format", label: t("navFormat") },
    { href: "#bracket", label: t("navBracket") },
    { href: "#trophy", label: t("navTrophy") },
    { href: "#fixtures", label: t("navFixtures") },
    { href: "#committee", label: "Committee" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-9 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-xl py-3"
          : "border-b border-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="group flex items-center">
          <Logo className="h-12 w-12 transition-transform duration-500 group-hover:rotate-[8deg]" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-heading text-sm uppercase tracking-[0.12em] text-cloud/70 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitcher lang={lang} setLang={setLang} />
          <a
            href="#register"
            className="group inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-all hover:bg-gold-soft hover:shadow-[0_0_35px_-6px_rgba(244,196,48,0.7)]"
          >
            <Trophy className="h-4 w-4" />
            {t("navRegister")}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LangSwitcher lang={lang} setLang={setLang} />
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg border border-white/10 p-2 text-cloud"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden lg:hidden transition-[max-height] duration-500 ${
          open ? "max-h-[28rem]" : "max-h-0"
        }`}
      >
        <div className="mx-4 mt-3 rounded-2xl glass p-5">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 font-heading text-sm uppercase tracking-[0.14em] text-cloud/80 hover:bg-white/5 hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#register"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-ink"
          >
            <Trophy className="h-4 w-4" /> {t("navRegister")}
          </a>
        </div>
      </div>
    </header>
  );
}

function LangSwitcher({
  lang,
  setLang,
}: {
  lang: string;
  setLang: (l: never) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 font-heading text-xs font-semibold uppercase tracking-[0.1em] text-cloud/80 transition-colors hover:border-gold/50 hover:text-gold"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        {current.label}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-white/10 bg-ink-2/95 p-1 shadow-premium backdrop-blur-xl">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code as never);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left font-heading text-sm uppercase tracking-wide transition-colors hover:bg-white/5 ${
                l.code === lang ? "text-gold" : "text-cloud/75"
              }`}
            >
              {l.native}
              {l.code === lang && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
