// Same badge/racket mark as src/app/icon.svg and PadeliumLogo.tsx in the
// desktop app (kept as a local copy since this Next.js project can't
// import across the apps' separate `src/` roots).

export function PadeliumMark({
  size = 32,
  radius = 8,
}: {
  size?: number;
  radius?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <rect width={64} height={64} rx={radius * 2} fill="#020617" />
      <g
        transform="translate(12.8 12.8) scale(1.6)"
        stroke="#74c2ee"
        strokeWidth={1.5}
        strokeLinecap="round"
      >
        <circle cx="15" cy="7" r="5.2" />
        <line x1="7.5" y1="14.5" x2="3" y2="19" />
        <line x1="9" y1="16" x2="4.5" y2="20.5" />
      </g>
    </svg>
  );
}
