export default function Crest({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="crestG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12c46b" />
          <stop offset="1" stopColor="#00381f" />
        </linearGradient>
        <linearGradient id="crestGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe58a" />
          <stop offset="0.5" stopColor="#f4c430" />
          <stop offset="1" stopColor="#c8961c" />
        </linearGradient>
      </defs>
      {/* Shield */}
      <path
        d="M32 3 58 12v20c0 15-11 25-26 29C17 57 6 47 6 32V12L32 3Z"
        fill="url(#crestG)"
        stroke="url(#crestGold)"
        strokeWidth="2"
      />
      {/* Radiating unity spokes */}
      <g stroke="url(#crestGold)" strokeWidth="1.4" opacity="0.9">
        <line x1="32" y1="30" x2="32" y2="14" />
        <line x1="32" y1="30" x2="46" y2="22" />
        <line x1="32" y1="30" x2="46" y2="38" />
        <line x1="32" y1="30" x2="32" y2="46" />
        <line x1="32" y1="30" x2="18" y2="38" />
        <line x1="32" y1="30" x2="18" y2="22" />
      </g>
      {/* Zone nodes */}
      <g fill="#eaf5ee">
        <circle cx="32" cy="14" r="2.4" />
        <circle cx="46" cy="22" r="2.4" />
        <circle cx="46" cy="38" r="2.4" />
        <circle cx="32" cy="46" r="2.4" />
        <circle cx="18" cy="38" r="2.4" />
        <circle cx="18" cy="22" r="2.4" />
      </g>
      {/* FCT centre */}
      <circle cx="32" cy="30" r="4.6" fill="url(#crestGold)" />
      <circle cx="32" cy="30" r="4.6" fill="none" stroke="#04120a" strokeWidth="0.8" />
    </svg>
  );
}
