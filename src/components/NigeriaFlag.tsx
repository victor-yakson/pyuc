export default function NigeriaFlag({
  className = "h-4 w-6",
  rounded = true,
}: {
  className?: string;
  rounded?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 90 60"
      className={className}
      role="img"
      aria-label="Flag of Nigeria"
      preserveAspectRatio="xMidYMid slice"
    >
      {rounded && (
        <defs>
          <clipPath id="flagRound">
            <rect width="90" height="60" rx="6" />
          </clipPath>
        </defs>
      )}
      <g clipPath={rounded ? "url(#flagRound)" : undefined}>
        <rect x="0" width="30" height="60" fill="#008751" />
        <rect x="30" width="30" height="60" fill="#ffffff" />
        <rect x="60" width="30" height="60" fill="#008751" />
      </g>
      <rect
        x="0.5"
        y="0.5"
        width="89"
        height="59"
        rx={rounded ? 6 : 0}
        fill="none"
        stroke="rgba(0,0,0,0.15)"
      />
    </svg>
  );
}
