"use client";

import { Play } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { IMG } from "@/data/zones";
import { useTrailer } from "./TrailerModal";
import { useLang } from "@/lib/i18n";

const TILES = [
  { img: IMG.action, span: "sm:col-span-2 sm:row-span-2", label: "Matchday roar" },
  { img: IMG.boots, span: "", label: "Ready to run" },
  { img: IMG.fans, span: "", label: "One nation, one voice" },
  { img: IMG.player, span: "", label: "Homegrown talent" },
  { img: IMG.stadium, span: "sm:col-span-2", label: "Under the lights" },
  { img: IMG.ball, span: "", label: "The beautiful game" },
];

export default function Gallery() {
  const { open: openTrailer } = useTrailer();
  const { t } = useLang();
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t("galleryEyebrow")}
          title={t("galleryTitle")}
          accent={t("galleryAccent")}
          align="center"
          sub={t("gallerySub")}
        />

        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-4 lg:auto-rows-[200px]">
          {TILES.map((t, i) => (
            <Reveal key={i} delay={i * 0.05} className={t.span}>
              <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-naija-dark">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${t.img})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                {i === 0 && (
                  <button
                    onClick={openTrailer}
                    aria-label="Watch highlights"
                    className="absolute inset-0 grid place-items-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-gold/90 text-ink shadow-[0_0_40px_rgba(244,196,48,0.6)] transition-transform duration-300 group-hover:scale-110">
                      <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                    </span>
                  </button>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-heading text-sm uppercase tracking-wide text-cloud drop-shadow">
                    {t.label}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
