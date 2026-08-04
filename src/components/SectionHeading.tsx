import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  sub,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal>
      <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        <div
          className={`mb-4 flex items-center gap-3 ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-8 bg-gold" />
          <span className="font-heading text-xs uppercase tracking-[0.32em] text-gold">
            {eyebrow}
          </span>
          <span className="h-px w-8 bg-gold" />
        </div>
        <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] uppercase leading-[0.92] text-cloud">
          {title} {accent && <span className="text-gradient-gold">{accent}</span>}
        </h2>
        {sub && <p className="mt-5 text-lg leading-relaxed text-cloud/70">{sub}</p>}
      </div>
    </Reveal>
  );
}
