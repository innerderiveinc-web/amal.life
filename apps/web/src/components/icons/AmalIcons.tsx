import React from 'react';

/**
 * UNIFIED ISLAMIC VECTOR STROKE ICONS (AMAL OS DESIGN SYSTEM)
 * Replaces irregular platform emojis (Apple 3D vs Android Cartoon vs Windows Flat)
 * with mathematically unified, 1.75px stroke SVG icons.
 * Zero bitmaps, sub-1KB payload, responsive across all screen DPIs.
 */

export interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const IconKaaba: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    {/* Kaaba Cube Isometric Outline */}
    <path d="M12 2L21 6.5V17.5L12 22L3 17.5V6.5L12 2Z" />
    <path d="M12 22V6.5" />
    <path d="M21 6.5L12 11.5L3 6.5" />
    {/* Golden Kiswah Band Accent */}
    <path d="M7.5 9L12 11.5L16.5 9" stroke="#EAB308" strokeWidth={strokeWidth} />
  </svg>
);

export const IconQuran: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    {/* Open Book Folios on Rehal */}
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    {/* Wooden Rehal X-Stand Base */}
    <path d="M6 21l6-3 6 3" strokeOpacity="0.6" />
  </svg>
);

export const IconCompass: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    {/* Outer Compass Housing */}
    <circle cx="12" cy="12" r="10" />
    {/* Qibla Needle Diamond */}
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={color} fillOpacity="0.2" />
    <circle cx="12" cy="12" r="1.5" fill={color} />
  </svg>
);

export const IconTasbih: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    {/* Circular Bead Necklace */}
    <circle cx="12" cy="10" r="7" strokeDasharray="2 3.5" />
    {/* Imam Bead / Minaret Finial */}
    <path d="M12 17v3" />
    {/* Silk Tassel */}
    <path d="M10 23l2-3 2 3" />
  </svg>
);

export const IconMoon: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const IconSun: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

export const IconScale: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    {/* Balance of Justice / Fiqh Mizan */}
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="3" y1="7" x2="21" y2="7" />
    {/* Left Pan */}
    <path d="M3 7l3 7h-6l3-7z" fill={color} fillOpacity="0.1" />
    {/* Right Pan */}
    <path d="M21 7l3 7h-6l3-7z" fill={color} fillOpacity="0.1" />
    {/* Base Stand */}
    <line x1="8" y1="21" x2="16" y2="21" />
  </svg>
);

export const IconLibrary: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    {/* Shelf of Classical Codices */}
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    <line x1="9" y1="6" x2="15" y2="6" strokeOpacity="0.7" />
    <line x1="9" y1="10" x2="15" y2="10" strokeOpacity="0.7" />
  </svg>
);

export const IconMosque: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    {/* Central Onion Dome */}
    <path d="M12 3c-3 3-5 5.5-5 8.5a5 5 0 0 0 10 0c0-3-2-5.5-5-8.5z" />
    <path d="M12 2v2" />
    {/* Minarets Left and Right */}
    <path d="M4 10v11" />
    <path d="M20 10v11" />
    <path d="M4 10l-1 2h2l-1-2z" />
    <path d="M20 10l-1 2h2l-1-2z" />
    {/* Base Foundation */}
    <path d="M2 21h20" />
    {/* Central Horseshoe Archway */}
    <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
  </svg>
);

export const IconSparkle: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <path d="M12 3v18M3 12h18M6.5 6.5l11 11M6.5 17.5l11-11" strokeOpacity="0.4" />
    <circle cx="12" cy="12" r="3" fill={color} />
  </svg>
);

export const IconShieldCheck: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const IconPlay: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const IconPause: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

export const IconBookmark: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

export const IconCopy: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

export const IconShare: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export const IconClose: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const IconArrowLeft: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const IconArrowRight: React.FC<IconProps> = ({
  size = 20,
  color = 'currentColor',
  strokeWidth = 1.75,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
