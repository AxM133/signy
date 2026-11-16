/** НЛО с лучом и «404». Своя система координат — вырезана из общего холста 1440×833. */
export const Ufo = ({ className }: { className?: string }) => (
  <svg viewBox="430 150 570 520" className={className} role="img" aria-label="НЛО освещает надпись 404">
    <defs>
      <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e8f7f8" stopOpacity="0.95" />
        <stop offset="1" stopColor="#b9dcf2" stopOpacity="0.55" />
      </linearGradient>
    </defs>

    <g className="animate-float-slow">
      {/* кабина */}
      <path d="M644 232c0-38 36-66 80-66s82 28 82 66z" fill="#2a73e8" />
      <path d="M656 232c0-30 30-52 68-52s70 22 70 52z" fill="#3d5a87" />
      <path d="M672 232l8-48h88l10 48z" fill="#365480" />
      {/* тарелка */}
      <ellipse cx="724" cy="288" rx="266" ry="66" fill="#2a73e8" />
      <path d="M466 276c60 14 160 20 258 20s198-6 258-20c-4 40-120 62-258 62S470 316 466 276z" fill="#3d5a87" opacity="0.9" />
      <ellipse cx="724" cy="294" rx="162" ry="38" fill="#2a73e8" />
      <ellipse cx="724" cy="296" rx="120" ry="28" fill="#4a93f7" />
      <ellipse cx="724" cy="298" rx="68" ry="15" fill="#eaf6fa" />
      <rect x="708" y="325" width="32" height="26" fill="#6f8fb3" opacity="0.7" />
    </g>

    {/* луч */}
    <polygon points="658,310 790,310 925,640 515,640" fill="url(#beam)" className="animate-beam" />

    {/* 404 */}
    <g fill="#fff" fontFamily="'IBM Plex Sans', sans-serif" fontWeight="700" fontSize="190" textAnchor="middle">
      <text x="603" y="640" transform="rotate(-12 603 600)">4</text>
      <text x="722" y="600">0</text>
      <text x="842" y="640" transform="rotate(12 842 600)">4</text>
    </g>

    {/* луч поверх цифр — как в макете, цифры просвечивают */}
    <polygon points="658,310 790,310 925,640 515,640" fill="url(#beam)" opacity="0.35" />
    <ellipse cx="720" cy="640" rx="206" ry="17" fill="#2a73e8" />
    <ellipse cx="632" cy="641" rx="40" ry="4.5" fill="#3d5a87" opacity="0.7" />
    <ellipse cx="722" cy="641" rx="36" ry="4.5" fill="#3d5a87" opacity="0.7" />
    <ellipse cx="826" cy="641" rx="40" ry="4.5" fill="#3d5a87" opacity="0.7" />
  </svg>
)
