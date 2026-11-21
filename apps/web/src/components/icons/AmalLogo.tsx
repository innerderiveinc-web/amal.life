import React from 'react';

export interface AmalLogoProps {
  size?: number;
  variant?: 'mark' | 'full';
  showBadge?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AMAL OS — Official Sovereign Vector Emblem & Logo
 * Pure geometric SVG (0 KB raster, infinite scalability):
 *  - Pointed Prophetic Mihrab Arch (Rawdah & Sanctuary)
 *  - Mosque Dome & Minarets Silhouette with Celestial Crescent & Star
 *  - Open Book / Mushaf on Rehal with Radiant Pages & Olive Sprout
 *  - Winding Golden Pathway ("Tariq") flowing outward
 *  - Regal Bilingual Lockup: AMAL | عمل — Niyyah se Amal tak
 */
export const AmalLogoMark: React.FC<{ size?: number; showBadge?: boolean; style?: React.CSSProperties }> = ({
  size = 40,
  showBadge = true,
  style,
}) => {
  const gradId = React.useId();
  const goldGradId = React.useId();
  const pathGradId = React.useId();
  const pageGradId = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      aria-label="AMAL OS Sovereign Emblem"
    >
      <defs>
        <linearGradient id={gradId} x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#064E3B" />
          <stop offset="45%" stopColor="#043929" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>

        <linearGradient id={goldGradId} x1="20" y1="12" x2="80" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="30%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="80%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        <linearGradient id={pathGradId} x1="50" y1="62" x2="50" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        <linearGradient id={pageGradId} x1="50" y1="50" x2="50" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FDFBF7" />
        </linearGradient>
      </defs>

      {showBadge && (
        <>
          <rect x="2" y="2" width="96" height="96" rx="22" fill={`url(#${gradId})`} />
          <rect
            x="2.75"
            y="2.75"
            width="94.5"
            height="94.5"
            rx="21.25"
            stroke={`url(#${goldGradId})`}
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
        </>
      )}

      {/* Outer Beveled Mihrab Arch Frame */}
      <path
        d="M50 14 C66 24 74 34 74 48 V80 C74 81.5 72.8 82.5 71.2 82.5 H28.8 C27.2 82.5 26 81.5 26 80 V48 C26 34 34 24 50 14 Z"
        fill={showBadge ? '#043324' : 'none'}
        stroke={`url(#${goldGradId})`}
        strokeWidth="3"
        strokeLinejoin="round"
      />

      {/* Inner Fine Arch Outline */}
      <path
        d="M50 17.5 C63.5 26 70.5 35 70.5 48 V79.5 H29.5 V48 C29.5 35 36.5 26 50 17.5 Z"
        fill="none"
        stroke={`url(#${goldGradId})`}
        strokeWidth="0.8"
        strokeOpacity="0.7"
      />

      {/* Mosque Minarets Silhouette */}
      <path d="M34 46 V30 L35 28 L36 30 V46 Z" fill="#0D5C43" opacity="0.85" />
      <rect x="33.5" y="34" width="3" height="1" fill={`url(#${goldGradId})`} opacity="0.8" />
      <circle cx="35" cy="27.5" r="0.6" fill="#FEF08A" />

      <path d="M64 46 V30 L65 28 L66 30 V46 Z" fill="#0D5C43" opacity="0.85" />
      <rect x="63.5" y="34" width="3" height="1" fill={`url(#${goldGradId})`} opacity="0.8" />
      <circle cx="65" cy="27.5" r="0.6" fill="#FEF08A" />

      {/* Central Grand Mosque Dome */}
      <path d="M42 46 C42 38 46.5 34 50 33 C53.5 34 58 38 58 46 Z" fill="#0B523C" />
      <path d="M49.5 33 V31.5 H50.5 V33 Z" fill={`url(#${goldGradId})`} />
      <circle cx="50" cy="31" r="0.8" fill="#FEF08A" />

      {/* Celestial Crescent Moon & Star */}
      <path
        d="M52 20.5 C49 20.8 46.5 23.2 46.5 26.2 C46.5 29.4 49.1 32 52.3 32 C53.7 32 55 31.5 56 30.6 C55 32.4 52.8 33.6 50.4 33.6 C46.8 33.6 44 30.8 44 27.2 C44 23.6 46.8 20.8 50.4 20.8 C51 20.8 51.5 20.9 52 20.5 Z"
        fill={`url(#${goldGradId})`}
      />
      <path
        d="M53.5 22.5 L54.1 23.8 L55.5 24 L54.4 25 L54.7 26.4 L53.5 25.7 L52.3 26.4 L52.6 25 L51.5 24 L52.9 23.8 Z"
        fill="#FEF08A"
      />

      {/* Winding Golden Pathway ("Tariq") */}
      <path
        d="M50 63 C48 68 44 71 45 76 C46 80 48 81 44 86 H56 C57 82 54 79 55 76 C56 71 52 68 50 63 Z"
        fill={`url(#${pathGradId})`}
      />

      {/* Rehal Base */}
      <path d="M37 63 L46 58 M63 63 L54 58" stroke={`url(#${goldGradId})`} strokeWidth="2.2" strokeLinecap="round" />

      {/* Open Holy Quran Pages */}
      <path
        d="M50 53 C43 50.5 35 51.5 31 53.5 C31 54 31.2 60 31.5 61 C35.5 59 43 58 50 61 Z"
        fill={`url(#${pageGradId})`}
        stroke={`url(#${goldGradId})`}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M50 53 C57 50.5 65 51.5 69 53.5 C69 54 68.8 60 68.5 61 C64.5 59 57 58 50 61 Z"
        fill={`url(#${pageGradId})`}
        stroke={`url(#${goldGradId})`}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M50 53 V61" stroke="#92400E" strokeWidth="1.4" strokeLinecap="round" />

      {/* Delicate Golden Olive Sprout */}
      <path d="M68 55 C70 52 73 50 74 46" stroke={`url(#${goldGradId})`} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M74 46 C77 46 78 43 78 41 C76 41 73 43 74 46 Z" fill={`url(#${goldGradId})`} />
      <path d="M70.5 51 C73.5 50.5 74.5 48.5 74 47 C72 47.5 70 49 70.5 51 Z" fill={`url(#${goldGradId})`} />

      {/* Apex Golden Finial */}
      <circle cx="50" cy="11.5" r="1.6" fill={`url(#${goldGradId})`} />
      <circle cx="50" cy="11.5" r="0.8" fill="#FEF08A" />
    </svg>
  );
};

export const AmalLogo: React.FC<AmalLogoProps> = ({
  size = 42,
  variant = 'full',
  showBadge = true,
  className,
  style,
}) => {
  if (variant === 'mark') {
    return <AmalLogoMark size={size} showBadge={showBadge} style={style} />;
  }

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <AmalLogoMark size={size} showBadge={showBadge} />
      <div style={{ whiteSpace: 'nowrap' }}>
        {/* Top Lockup: AMAL | عمل */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontSize: Math.round(size * 0.52),
              fontWeight: 900,
              color: '#064E3B',
              letterSpacing: 0.8,
              fontFamily: 'serif, system-ui',
            }}
          >
            AMAL
          </span>

          <span
            style={{
              width: 1.5,
              height: Math.round(size * 0.44),
              backgroundColor: '#D97706',
              display: 'inline-block',
            }}
          />

          <span
            style={{
              fontSize: Math.round(size * 0.48),
              fontWeight: 700,
              color: '#B45309',
              fontFamily: 'Amiri, Noto Nastaliq Urdu, serif',
              lineHeight: 1,
            }}
          >
            عمل
          </span>
        </div>

        {/* Bottom Tagline: — Niyyah se Amal tak — */}
        <div
          style={{
            fontSize: 9.5,
            color: '#475569',
            fontStyle: 'italic',
            fontWeight: 600,
            letterSpacing: 0.5,
            marginTop: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <span style={{ color: '#D97706' }}>—</span>
          <span>Niyyah se Amal tak</span>
          <span style={{ color: '#D97706' }}>—</span>
        </div>
      </div>
    </div>
  );
};
