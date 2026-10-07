export const AmalTheme = {
  colors: {
    // Primary Brand - Restrained Emerald & Sage (Apple Health + Modern Editorial)
    primary: '#0F4C3A',        // Deep forest emerald
    primaryHover: '#16624B',
    primaryLight: '#E8F3EE',   // Calm sage tint
    primaryMuted: '#2B5747',

    // Neutral Surfaces
    surface: {
      backgroundLight: '#FAF9F6', // Parchment ivory / sand
      cardLight: '#FFFFFF',
      borderLight: '#EAE6DF',
      backgroundDark: '#121514',  // Deep mineral charcoal
      cardDark: '#1B201E',
      borderDark: '#2C3532',
    },

    // Typography
    text: {
      primaryLight: '#181E1C',
      secondaryLight: '#5C6662',
      tertiaryLight: '#8C9692',
      primaryDark: '#F3F4F3',
      secondaryDark: '#A6B0AC',
      tertiaryDark: '#6E7A75',
    },

    // Warm Accents
    accent: {
      terracotta: '#C27D38',    // Warm amber terracotta
      terracottaLight: '#FBF2EA',
      sand: '#F2ECE4',
      goldMuted: '#9B8355',
    },

    // Functional State Colors (Gentle, Non-Shaming)
    status: {
      success: '#1B7A52',
      successLight: '#EDF7F2',
      info: '#2563EB',
      infoLight: '#EFF6FF',
      warning: '#B45309',
      warningLight: '#FFFBEB',
      neutralGray: '#64748B',
    },
  },

  typography: {
    fonts: {
      sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      serif: 'Merriweather, Georgia, Cambria, serif',
      arabic: '"Amiri", "Scheherazade New", "Traditional Arabic", serif',
    },
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.7,
      arabic: 2.0,
    },
  },

  spacing: {
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
  },

  radii: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    full: '9999px',
  },
};
