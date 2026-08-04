import { Star } from "lucide-react";

const WORDS = [
  "One Nation",
  "One Game",
  "Six Zones",
  "One Trophy",
  "Unity Through Sport",
  "Represent Your Region",
  "Naija To The World",
];

export default function Marquee() {
  const strip = [...WORDS, ...WORDS];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-naija py-4">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {strip.map((w, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-xl uppercase tracking-wide text-cloud/95">
              {w}
            </span>
            <Star className="h-4 w-4 shrink-0 text-gold" fill="currentColor" />
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-naija to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-naija to-transparent" />
    </div>
  );
}
