/**
 * AMAL OS — Enterprise Design System Tokens
 * 
 * Formal typography, color palette, spacing, elevation, and component tokens
 * reflecting Ahl al-Sunnah aesthetic dignity, emerald sanctuary motifs,
 * and high-contrast WCAG AAA compliance.
 */

export const AmalTokens = {
  colors: {
    emerald: {
      900: '#064E3B',
      800: '#065F46',
      700: '#047857',
      600: '#059669',
      500: '#10B981',
      100: '#D1FAE5',
      50: '#ECFDF5',
    },
    gold: {
      900: '#78350F',
      800: '#92400E',
      700: '#B45309',
      600: '#D97706',
      500: '#F59E0B',
      100: '#FEF3C7',
      50: '#FFFBEB',
    },
    slate: {
      900: '#0F172A',
      800: '#1E293B',
      700: '#334155',
      600: '#475569',
      500: '#64748B',
      400: '#94A3B8',
      200: '#E2E8F0',
      100: '#F1F5F9',
      50: '#F8FAFC',
    },
    rose: {
      900: '#881337',
      800: '#9F1239',
      700: '#BE123C',
      600: '#E11D48',
      100: '#FFE4E6',
      50: '#FFF1F2',
    },
    indigo: {
      900: '#312E81',
      800: '#3730A3',
      700: '#4338CA',
      600: '#4F46E5',
      100: '#E0E7FF',
      50: '#EEF2FF',
    },
    white: '#FFFFFF',
    black: '#000000',
  },
  typography: {
    fonts: {
      sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      arabic: "'Amiri', 'Traditional Arabic', serif",
      urdu: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
    },
    sizes: {
      xs: '11px',
      sm: '12.5px',
      base: '14px',
      md: '15px',
      lg: '17px',
      xl: '20px',
      xxl: '24px',
      hero: '32px',
    },
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 800,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      arabicQuran: 2.1,
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },
  radii: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    xxl: '20px',
    full: '9999px',
  },
  shadows: {
    subtle: '0 1px 3px rgba(0, 0, 0, 0.04)',
    card: '0 4px 16px rgba(0, 0, 0, 0.05)',
    cardHover: '0 8px 24px rgba(0, 0, 0, 0.08)',
    activeEmerald: '0 4px 16px rgba(5, 150, 105, 0.14)',
  },
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.25s ease',
  },
} as const;

export type AmalThemeTokens = typeof AmalTokens;
