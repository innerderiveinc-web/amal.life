import React from 'react';

/**
 * PURE ZERO-IMAGE MATHEMATICAL VECTOR ARABESQUE SYSTEM
 * Provides luxury Islamic geometric art (Khatam / Rub el Hizb 8-point stars,
 * Girih interlaced borders, and Ottoman/Mamluk manuscript cartouches)
 * with 0 KB image overhead and 100% SVG crispness at any display scale.
 */

interface StarRosetteProps {
  size?: number;
  color?: string;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * 8-Pointed Star Rosette (Khatam Sulaymani / Rub el Hizb)
 * Formed by two interlaced squares rotated by 45 degrees with an inner radiant ring.
 */
export const IslamicStarRosette: React.FC<StarRosetteProps> = ({
  size = 24,
  color = '#D97706',
  fill = 'none',
  className,
  style,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {/* Outer Interlaced Square 1 */}
      <rect
        x="18"
        y="18"
        width="64"
        height="64"
        stroke={color}
        strokeWidth="2.5"
        fill={fill}
      />
      {/* Outer Interlaced Square 2 (Rotated 45 deg) */}
      <rect
        x="18"
        y="18"
        width="64"
        height="64"
        transform="rotate(45 50 50)"
        stroke={color}
        strokeWidth="2.5"
        fill={fill}
      />
      {/* Inner Concentric Circle */}
      <circle cx="50" cy="50" r="22" stroke={color} strokeWidth="1.8" strokeDasharray="3 3" />
      {/* Central Diamond Bindu */}
      <circle cx="50" cy="50" r="6" fill={color} />
      {/* 8 Radiant Cardinal Nodes */}
      <circle cx="50" cy="18" r="2.5" fill={color} />
      <circle cx="50" cy="82" r="2.5" fill={color} />
      <circle cx="18" cy="50" r="2.5" fill={color} />
      <circle cx="82" cy="50" r="2.5" fill={color} />
    </svg>
  );
};

interface BismillahCartoucheProps {
  bismillahText?: string;
  surahNumber?: number;
  fontSize?: number;
  variant?: 'gold' | 'emerald' | 'amber';
  style?: React.CSSProperties;
}

/**
 * Manuscript Cartouche (Unwan) for Surah Opening & Bismillah
 * Replicates the sacred gold-leaf manuscript medallions of historical Quranic codices.
 */
export const IslamicBismillahCartouche: React.FC<BismillahCartoucheProps> = ({
  bismillahText = 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  fontSize = 24,
  variant = 'gold',
  style,
}) => {
  const colors = {
    gold: {
      bg: '#FFFDF7',
      border: '#D97706',
      goldHairline: '#FDE68A',
      accent: '#92400E',
      text: '#166534',
      shadow: '0 4px 20px rgba(217, 119, 6, 0.08)',
    },
    emerald: {
      bg: '#F0FDF4',
      border: '#059669',
      goldHairline: '#A7F3D0',
      accent: '#065F46',
      text: '#064E3B',
      shadow: '0 4px 20px rgba(5, 150, 105, 0.08)',
    },
    amber: {
      bg: '#FEFCE8',
      border: '#CA8A04',
      goldHairline: '#FEF08A',
      accent: '#854D0E',
      text: '#713F12',
      shadow: '0 4px 20px rgba(202, 138, 4, 0.08)',
    },
  }[variant];

  return (
    <div
      style={{
        position: 'relative',
        margin: '20px auto 24px',
        maxWidth: 780,
        backgroundColor: colors.bg,
        border: `1.5px solid ${colors.border}`,
        borderRadius: 12,
        padding: '20px 24px',
        boxShadow: colors.shadow,
        textAlign: 'center',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Dual Hairline Inset Ring */}
      <div
        style={{
          position: 'absolute',
          top: 4,
          left: 4,
          right: 4,
          bottom: 4,
          border: `1px dashed ${colors.goldHairline}`,
          borderRadius: 8,
          pointerEvents: 'none',
        }}
      />

      {/* Top Left Corner Rosette */}
      <div style={{ position: 'absolute', top: 6, left: 6 }}>
        <IslamicStarRosette size={18} color={colors.border} />
      </div>

      {/* Top Right Corner Rosette */}
      <div style={{ position: 'absolute', top: 6, right: 6 }}>
        <IslamicStarRosette size={18} color={colors.border} />
      </div>

      {/* Bottom Left Corner Rosette */}
      <div style={{ position: 'absolute', bottom: 6, left: 6 }}>
        <IslamicStarRosette size={18} color={colors.border} />
      </div>

      {/* Bottom Right Corner Rosette */}
      <div style={{ position: 'absolute', bottom: 6, right: 6 }}>
        <IslamicStarRosette size={18} color={colors.border} />
      </div>

      {/* Ornate Vector Top Crest */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" style={{ opacity: 0.7 }}>
          <line x1="0" y1="6" x2="50" y2="6" stroke={colors.border} strokeWidth="1" />
          <circle cx="56" cy="6" r="3" fill={colors.border} />
        </svg>
        <IslamicStarRosette size={16} color={colors.border} />
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" style={{ opacity: 0.7 }}>
          <circle cx="4" cy="6" r="3" fill={colors.border} />
          <line x1="10" y1="6" x2="60" y2="6" stroke={colors.border} strokeWidth="1" />
        </svg>
      </div>

      {/* Sacred Vocalized Matn */}
      <div
        dir="rtl"
        style={{
          fontFamily: 'var(--font-arabic), "Amiri", "Traditional Arabic", serif',
          fontSize: fontSize,
          fontWeight: 700,
          color: colors.text,
          lineHeight: 1.8,
          letterSpacing: 0.5,
          textShadow: '0 1px 2px rgba(0,0,0,0.04)',
        }}
      >
        {bismillahText}
      </div>

      {/* Ornate Vector Bottom Crest */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 8 }}>
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" style={{ opacity: 0.7 }}>
          <line x1="0" y1="6" x2="50" y2="6" stroke={colors.border} strokeWidth="1" />
          <circle cx="56" cy="6" r="3" fill={colors.border} />
        </svg>
        <IslamicStarRosette size={16} color={colors.border} />
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" style={{ opacity: 0.7 }}>
          <circle cx="4" cy="6" r="3" fill={colors.border} />
          <line x1="10" y1="6" x2="60" y2="6" stroke={colors.border} strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
};

interface ManuscriptFrameProps {
  children: React.ReactNode;
  accentColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  padding?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Luxury Manuscript Container Frame
 * Frames any card, mutun excerpt, or book cover with authentic corner rosettes
 * and continuous inner geometric hairlines.
 */
export const IslamicManuscriptFrame: React.FC<ManuscriptFrameProps> = ({
  children,
  accentColor = '#B45309',
  borderColor = '#E2E8F0',
  backgroundColor = '#FFFFFF',
  padding = 20,
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        position: 'relative',
        backgroundColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 14,
        padding,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.2s ease',
        ...style,
      }}
    >
      {/* Top Left Rosette */}
      <div style={{ position: 'absolute', top: 5, left: 5, pointerEvents: 'none', opacity: 0.85 }}>
        <IslamicStarRosette size={14} color={accentColor} />
      </div>

      {/* Top Right Rosette */}
      <div style={{ position: 'absolute', top: 5, right: 5, pointerEvents: 'none', opacity: 0.85 }}>
        <IslamicStarRosette size={14} color={accentColor} />
      </div>

      {/* Bottom Left Rosette */}
      <div style={{ position: 'absolute', bottom: 5, left: 5, pointerEvents: 'none', opacity: 0.85 }}>
        <IslamicStarRosette size={14} color={accentColor} />
      </div>

      {/* Bottom Right Rosette */}
      <div style={{ position: 'absolute', bottom: 5, right: 5, pointerEvents: 'none', opacity: 0.85 }}>
        <IslamicStarRosette size={14} color={accentColor} />
      </div>

      {/* Content */}
      {children}
    </div>
  );
};

interface IslamicDividerProps {
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Ornate Sacred Islamic Divider with Centered 8-Point Star
 */
export const IslamicDivider: React.FC<IslamicDividerProps> = ({
  color = '#D97706',
  className,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        margin: '24px 0',
        opacity: 0.85,
        ...style,
      }}
      aria-hidden="true"
    >
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${color})` }} />
      <IslamicStarRosette size={18} color={color} />
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  );
};

interface SurahTitleCartoucheProps {
  surahNumber: number;
  nameArabic: string;
  nameEnglish: string;
  nameUrdu: string;
  versesCount: number;
  revelationType: 'MECCAN' | 'MEDINAN';
  isUrdu?: boolean;
}

/**
 * Illuminated Quran Manuscript Surah Header Cartouche (سرلوحِ سورت)
 * Replicates the classical illuminated golden frontispieces of Medina and Istanbul codices.
 */
export const IslamicSurahTitleCartouche: React.FC<SurahTitleCartoucheProps> = ({
  surahNumber,
  nameArabic,
  nameEnglish,
  nameUrdu,
  versesCount,
  revelationType,
  isUrdu = false,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #065F46 100%)',
        color: '#FFFFFF',
        borderRadius: 14,
        padding: '24px 28px',
        margin: '16px 0 24px',
        boxShadow: '0 8px 30px rgba(6, 78, 59, 0.22)',
        border: '1.5px solid rgba(212, 175, 55, 0.4)',
        overflow: 'hidden',
      }}
    >
      {/* Background Islamic Geometric Watermark */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          right: -20,
          opacity: 0.08,
          pointerEvents: 'none',
        }}
      >
        <IslamicStarRosette size={240} color="#D4AF37" />
      </div>

      {/* Decorative Gold Inset Border */}
      <div
        style={{
          position: 'absolute',
          inset: 6,
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: 10,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        {/* Left: Surah Metadata */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.22)',
                color: '#FDE68A',
                border: '1px solid rgba(212, 175, 55, 0.45)',
                padding: '2px 10px',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 0.5,
              }}
            >
              #{surahNumber}
            </span>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                color: '#A7F3D0',
                padding: '2px 10px',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
              }}
            >
              {revelationType === 'MECCAN' ? (isUrdu ? 'مکیہ' : 'Makki') : (isUrdu ? 'مدنیہ' : 'Madani')}
            </span>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
              {versesCount} {isUrdu ? 'آیات' : 'Verses'}
            </span>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0, color: '#FFFFFF', letterSpacing: -0.2 }}>
            {nameEnglish} <span style={{ fontSize: 16, fontWeight: 600, color: '#FDE68A', marginLeft: 6 }}>({nameUrdu})</span>
          </h2>
        </div>

        {/* Right: Classical Arabic Calligraphy with Khatam Sulaymani */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <IslamicStarRosette size={28} color="#D4AF37" />
          <div
            dir="rtl"
            style={{
              fontFamily: 'var(--font-arabic), "Amiri", "Traditional Arabic", serif',
              fontSize: 34,
              fontWeight: 700,
              color: '#FDE68A',
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              lineHeight: 1.2,
            }}
          >
            سُورَةُ {nameArabic}
          </div>
        </div>
      </div>
    </div>
  );
};

