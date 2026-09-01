import { Radio } from "lucide-react";

// Breaking-news items. Update these as the campaign progresses.
const NEWS = [
  "Organisers host Grand Patron H.E. Dr. Abdullahi Umar Ganduje, former Governor of Kano State",
  "Project Ambassador Samson Siasia, ex-Super Eagles star, attends the reception",
  "Ex-Super Eagles striker Brown Ideye joins the PYUC delegation",
  "6 MILLION Nigerians across the globe have registered so far",
];

export default function NewsTicker() {
  const strip = [...NEWS, ...NEWS];
  return (
    <div className="fixed inset-x-0 top-0 z-[60] flex h-9 w-full items-center overflow-hidden border-b border-gold/20 bg-ink-2/95 backdrop-blur-md">
      {/* Live label */}
      <div className="flex h-full shrink-0 items-center gap-1.5 bg-gold px-3 text-ink">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-ink" />
        </span>
        <Radio className="hidden h-3.5 w-3.5 sm:block" />
        <span className="font-heading text-[10px] font-bold uppercase tracking-[0.18em]">
          Latest
        </span>
      </div>

      {/* Scrolling news */}
      <div className="relative flex-1 overflow-hidden">
        <div className="animate-marquee flex w-max items-center whitespace-nowrap will-change-transform">
          {strip.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="px-4 text-xs text-cloud/85">{item}</span>
              <span className="text-gold" aria-hidden="true">
                ◆
              </span>
            </span>
          ))}
        </div>
        {/* right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-ink-2 to-transparent" />
      </div>
    </div>
  );
}
