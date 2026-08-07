"use client";

import { Send, PlayCircle, Globe, MessageCircle } from "lucide-react";
import Logo from "./Logo";
import { useLang } from "@/lib/i18n";

const NAV = [
  {
    head: "Tournament",
    links: ["The Mission", "The Zones", "Format", "Fixtures", "The Trophy"],
  },
  {
    head: "Get Involved",
    links: ["Register", "Volunteer", "Become a Partner", "Press Kit", "Careers"],
  },
  {
    head: "Info",
    links: ["Code of Conduct", "Privacy", "Terms", "Contact", "FAQ"],
  },
];

const SOCIALS = [Send, MessageCircle, Globe, PlayCircle];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative border-t border-white/10 bg-ink-2/60">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          {/* brand */}
          <div className="col-span-2 md:col-span-3">
            <a href="#top" className="flex items-center">
              <Logo className="h-14 w-14" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cloud/55">
              {t("footerTagline")}
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cloud/60 transition-all hover:border-gold/40 hover:text-gold"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {NAV.map((col) => (
            <div key={col.head}>
              <h4 className="font-heading text-xs uppercase tracking-[0.2em] text-gold">
                {col.head}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-cloud/55 transition-colors hover:text-cloud"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-cloud/40 md:flex-row md:text-left">
          <p>© 2026 Presidential Youth Unity Cup (PYUC). A Federal Government of Nigeria initiative.</p>
          <p className="font-heading uppercase tracking-[0.18em]">
            Naija <span className="text-gold">To The World</span> 🇳🇬
          </p>
        </div>
      </div>
    </footer>
  );
}
