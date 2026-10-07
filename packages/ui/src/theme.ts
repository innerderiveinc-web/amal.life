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
      urdu: '"Noto Nastaliq Urdu", "Jameel Noori Nastaleeq", serif',
    },
    sizes: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.7,
      arabic: 2.0,
    },
  },

  spacing: {
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
  },

  radii: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },

  shadows: {
    subtle: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 1,
    },
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 2,
    },
  },
};

export function getThemePalette(isDark: boolean = false) {
  return {
    background: isDark ? AmalTheme.colors.surface.backgroundDark : AmalTheme.colors.surface.backgroundLight,
    card: isDark ? AmalTheme.colors.surface.cardDark : AmalTheme.colors.surface.cardLight,
    border: isDark ? AmalTheme.colors.surface.borderDark : AmalTheme.colors.surface.borderLight,
    textPrimary: isDark ? AmalTheme.colors.text.primaryDark : AmalTheme.colors.text.primaryLight,
    textSecondary: isDark ? AmalTheme.colors.text.secondaryDark : AmalTheme.colors.text.secondaryLight,
    textTertiary: isDark ? AmalTheme.colors.text.tertiaryDark : AmalTheme.colors.text.tertiaryLight,
    primary: AmalTheme.colors.primary,
    primaryLight: AmalTheme.colors.primaryLight,
    accent: AmalTheme.colors.accent,
    status: AmalTheme.colors.status,
  };
}
