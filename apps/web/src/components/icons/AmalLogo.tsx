import React from 'react';

export interface AmalLogoProps {
  size?: number;
  variant?: 'mark' | 'full';
  showBadge?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * AMAL OS — Official Sovereign Vector Emblem
 * Pure geometric SVG (0 KB raster):
 *  - Pointed Prophetic Mihrab Arch (Rawdah & Sanctuary)
 *  - Crescent & Guiding Star (Hijri & Celestial Time)
 *  - Open Book / Mushaf on Rehal (Classical Ilm & Niyyah to Amal)
 * Scales razor-sharp from 16px favicon to 512px splash screen.
 */
export const AmalLogoMark: React.FC<{ size?: number; showBadge?: boolean; style?: React.CSSProperties }> = ({
  size = 36,
  showBadge = true,
  style,
}) => {
  const gradId = React.useId();
  const goldGradId = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      aria-label="AMAL OS Emblem"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#065F46" />
          <stop offset="100%" stopColor="#022C22" />
        </linearGradient>
        <linearGradient id={goldGradId} x1="16" y1="10" x2="48" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      {showBadge && (
        <>
          <rect x="2" y="2" width="60" height="60" rx="15" fill={`url(#${gradId})`} />
          <rect
            x="2.75"
            y="2.75"
            width="58.5"
            height="58.5"
            rx="14.25"
            stroke={`url(#${goldGradId})`}
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
        </>
      )}

      {/* Pointed Islamic Mihrab Arch */}
      <path
        d="M32 10.5C41.5 17.5 47 24.5 47 35.5V48.5C47 49.6 46.1 50.5 45 50.5H19C17.9 50.5 17 49.6 17 48.5V35.5C17 24.5 22.5 17.5 32 10.5Z"
        fill={showBadge ? '#043929' : 'none'}
        stroke={`url(#${goldGradId})`}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />

      {/* Crescent Moon inside Arch */}
      <path
        d="M35.2 21.8C32.4 22.1 30.2 24.5 30.2 27.4C30.2 30.5 32.7 33 35.8 33C37.2 33 38.4 32.5 39.4 31.6C38.4 33.4 36.4 34.6 34.1 34.6C30.7 34.6 28 31.9 28 28.5C28 25.1 30.7 22.4 34.1 22.4C34.5 22.4 34.9 22.4 35.2 21.8Z"
        fill="#FDE68A"
      />

      {/* Guiding Star */}
      <path
        d="M38.5 23.5L39.2 25.1L40.8 25.8L39.2 26.5L38.5 28.1L37.8 26.5L36.2 25.8L37.8 25.1L38.5 23.5Z"
        fill="#FDE68A"
      />

      {/* Open Book / Mushaf at Base */}
      <path
        d="M21.5 39.5C25 38.2 29 38.6 32 40.8C35 38.6 39 38.2 42.5 39.5V47.2C39 46 35 46.4 32 48.4C29 46.4 25 46 21.5 47.2V39.5Z"
        fill="#FDFBF7"
        stroke={`url(#${goldGradId})`}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Book Spine */}
      <path d="M32 40.8V48.4" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />

      {/* Subtle Golden Apex Finial */}
      <circle cx="32" cy="8.2" r="1.4" fill="#FDE68A" />
    </svg>
  );
};

export const AmalLogo: React.FC<AmalLogoProps> = ({
  size = 38,
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
        gap: 10,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      <AmalLogoMark size={size} showBadge={showBadge} />
      <div style={{ whiteSpace: 'nowrap' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 4,
            lineHeight: 1.05,
          }}
        >
          <span
            style={{
              fontSize: Math.round(size * 0.5),
              fontWeight: 900,
              color: 'var(--amal-accent, #064E3B)',
              letterSpacing: 0.6,
            }}
          >
            AMAL
          </span>
          <span
            style={{
              fontSize: Math.round(size * 0.3),
              fontWeight: 800,
              color: 'var(--amal-gold, #B45309)',
              letterSpacing: 1.2,
              textTransform: 'uppercase',
            }}
          >
            OS
          </span>
        </div>
        <div
          style={{
            fontSize: 9,
            color: 'var(--amal-text-muted, #64748B)',
            fontWeight: 700,
            letterSpacing: 0.8,
            textTransform: 'uppercase',
            marginTop: 2,
          }}
        >
          Deen &amp; Life OS
        </div>
      </div>
    </div>
  );
};
