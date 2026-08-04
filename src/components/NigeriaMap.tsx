"use client";

import { useState } from "react";
import { ZONES } from "@/data/zones";
import {
  NG_STATES,
  NG_FCT,
  NG_ZONE_CENTROIDS,
  NG_VIEWBOX,
} from "@/data/nigeriaMap";

const zColor = Object.fromEntries(ZONES.map((z) => [z.id, z.color]));
const zShort = Object.fromEntries(ZONES.map((z) => [z.id, z.short]));
const zName = Object.fromEntries(ZONES.map((z) => [z.id, z.name]));

// Nudge a couple of labels off the FCT so nothing overlaps the capital callout.
const LABEL_OFFSET: Record<string, { dx: number; dy: number }> = {
  nc: { dx: -78, dy: 8 },
};

export default function NigeriaMap({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const fct = NG_FCT;

  // Capital callout sits up-and-right of the tiny FCT territory.
  const calloutX = fct.cx + 96;
  const calloutY = fct.cy - 92;

  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <svg viewBox={NG_VIEWBOX} className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="fctGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffe58a" />
            <stop offset="0.5" stopColor="#f4c430" />
            <stop offset="1" stopColor="#c8961c" />
          </linearGradient>
          <filter id="fctGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#f4c430" floodOpacity="0.9" />
          </filter>
          <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* States, coloured by geo-political zone */}
        <g filter="url(#mapShadow)">
          {NG_STATES.map((s) => {
            const on = activeId === s.zone || hovered === s.zone;
            return (
              <path
                key={s.state}
                d={s.d}
                fill={zColor[s.zone]}
                fillOpacity={on ? 1 : 0.72}
                stroke="rgba(4,18,12,0.55)"
                strokeWidth={0.6}
                className="cursor-pointer transition-all duration-200"
                style={on ? { filter: `drop-shadow(0 0 5px ${zColor[s.zone]})` } : undefined}
                onClick={() => onSelect(s.zone)}
                onMouseEnter={() => setHovered(s.zone)}
                onMouseLeave={() => setHovered(null)}
              >
                <title>{`${s.state} · ${zName[s.zone]}`}</title>
              </path>
            );
          })}
        </g>

        {/* Zone short-code labels */}
        {Object.entries(NG_ZONE_CENTROIDS).map(([id, c]) => {
          const o = LABEL_OFFSET[id] ?? { dx: 0, dy: 0 };
          return (
            <text
              key={id}
              x={c.x + o.dx}
              y={c.y + o.dy}
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none select-none font-display"
              style={{
                fontSize: 30,
                fill: "#04120a",
                paintOrder: "stroke",
                stroke: "rgba(255,255,255,0.45)",
                strokeWidth: 0.8,
              }}
            >
              {zShort[id]}
            </text>
          );
        })}

        {/* FCT — the capital, made to stand out */}
        <g>
          <path
            d={fct.d}
            fill="url(#fctGold)"
            stroke="#04120a"
            strokeWidth={1.4}
            style={{ filter: "url(#fctGlow)" }}
          >
            <title>FCT Abuja — Capital Guardians (Host)</title>
          </path>

          {/* pulsing ring on the capital */}
          <circle cx={fct.cx} cy={fct.cy} r="10" fill="none" stroke="#f4c430" strokeWidth="1.5">
            <animate attributeName="r" values="9;22;9" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0;0.9" dur="2.6s" repeatCount="indefinite" />
          </circle>

          {/* leader line to the callout */}
          <line
            x1={fct.cx}
            y1={fct.cy}
            x2={calloutX}
            y2={calloutY + 12}
            stroke="#f4c430"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
          <circle cx={fct.cx} cy={fct.cy} r="3.4" fill="#f4c430" stroke="#04120a" strokeWidth="1" />

          {/* callout pill */}
          <g transform={`translate(${calloutX} ${calloutY})`}>
            <rect x="-6" y="-16" width="128" height="34" rx="17" fill="#04120a" stroke="#f4c430" strokeWidth="1.4" />
            <path
              d="M6 1 l2.2 4.5 5 0.7 -3.6 3.5 0.85 5 -4.45 -2.35 -4.45 2.35 0.85 -5 -3.6 -3.5 5 -0.7 Z"
              fill="#f4c430"
              transform="translate(2 -6)"
            />
            <text x="28" y="1" dominantBaseline="middle" className="select-none font-heading" style={{ fontSize: 15, fill: "#f4c430", fontWeight: 700, letterSpacing: 1 }}>
              FCT · ABUJA
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
