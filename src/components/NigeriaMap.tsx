"use client";

import { useState } from "react";
import { ZONES, FCT } from "@/data/zones";

const color = Object.fromEntries(ZONES.map((z) => [z.id, z.color]));
const short = Object.fromEntries(ZONES.map((z) => [z.id, z.short]));
const name = Object.fromEntries(ZONES.map((z) => [z.id, z.name]));

// Nigeria-style silhouette (stylised — swap for an official SVG if you have one).
const OUTLINE =
  "M95,175 L150,120 L240,95 L350,90 L450,95 L520,110 L585,95 L650,120 L675,175 L630,215 L585,235 L620,290 L585,340 L620,400 L600,455 L630,505 L585,530 L545,510 L505,545 L455,560 L430,585 L400,558 L350,568 L300,560 L255,548 L205,565 L155,558 L120,535 L140,470 L100,400 L130,330 L95,255 Z";

// Each zone fills its geographic quadrant; clipped to the outline for clean edges.
const REGIONS = [
  { id: "nw", points: "35,50 360,50 360,305 35,305", lx: 195, ly: 195 },
  { id: "ne", points: "360,50 710,50 710,305 360,305", lx: 525, ly: 185 },
  { id: "nc", points: "35,305 710,305 710,415 35,415", lx: 175, ly: 362 },
  { id: "sw", points: "35,415 290,415 290,630 35,630", lx: 168, ly: 520 },
  { id: "ss", points: "290,415 500,415 500,630 290,630", lx: 395, ly: 528 },
  { id: "se", points: "500,415 710,415 710,630 500,630", lx: 600, ly: 515 },
];

export default function NigeriaMap({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg viewBox="0 0 745 660" className="h-full w-full">
        <defs>
          <clipPath id="ngClip">
            <path d={OUTLINE} />
          </clipPath>
          <linearGradient id="fctHub" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffe58a" />
            <stop offset="0.5" stopColor="#f4c430" />
            <stop offset="1" stopColor="#c8961c" />
          </linearGradient>
        </defs>

        {/* soft country shadow */}
        <path d={OUTLINE} fill="#00120b" transform="translate(6 8)" opacity="0.6" />

        {/* zone regions */}
        <g clipPath="url(#ngClip)">
          {REGIONS.map((r) => {
            const on = activeId === r.id || hovered === r.id;
            return (
              <polygon
                key={r.id}
                points={r.points}
                fill={color[r.id]}
                fillOpacity={on ? 0.95 : 0.5}
                stroke="rgba(4,18,12,0.65)"
                strokeWidth={2}
                className="cursor-pointer transition-all duration-300"
                style={on ? { filter: `drop-shadow(0 0 16px ${color[r.id]})` } : undefined}
                onClick={() => onSelect(r.id)}
                onMouseEnter={() => setHovered(r.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <title>{name[r.id]}</title>
              </polygon>
            );
          })}
        </g>

        {/* country border */}
        <path
          d={OUTLINE}
          fill="none"
          stroke="#f4c430"
          strokeWidth={2.5}
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* zone labels */}
        {REGIONS.map((r) => (
          <text
            key={r.id}
            x={r.lx}
            y={r.ly}
            textAnchor="middle"
            className="pointer-events-none select-none font-display"
            style={{ fontSize: 26, fill: "#04120a", fontWeight: 700 }}
          >
            {short[r.id]}
          </text>
        ))}

        {/* FCT centre hub */}
        <g className="cursor-help">
          <title>{`${FCT.name} — ${FCT.team}`}</title>
          <circle cx="372" cy="360" r="34" fill="#04120a" opacity="0.55" />
          <circle cx="372" cy="360" r="30" fill="url(#fctHub)" stroke="#04120a" strokeWidth="1.5" />
          {/* star */}
          <path
            d="M372 344 l4.6 9.4 10.4 1.5 -7.5 7.3 1.8 10.3 -9.3 -4.9 -9.3 4.9 1.8 -10.3 -7.5 -7.3 10.4 -1.5 Z"
            fill="#04120a"
          />
          <text
            x="372"
            y="405"
            textAnchor="middle"
            className="select-none font-heading"
            style={{ fontSize: 13, fill: "#f4c430", letterSpacing: 2, fontWeight: 700 }}
          >
            FCT
          </text>
        </g>
      </svg>
    </div>
  );
}
