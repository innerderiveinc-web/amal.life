import React, { createContext, useContext, useState, useEffect } from 'react';

export type SacredTheme = 'rawdah' | 'kiswah' | 'damascus' | 'lapis';

export interface ThemeMeta {
  id: SacredTheme;
  nameEnglish: string;
  nameUrdu: string;
  nameArabic: string;
  descriptionEn: string;
  primaryColor: string;
  accentGold: string;
  surfaceColor: string;
}

export const SACRED_THEMES: Record<SacredTheme, ThemeMeta> = {
  rawdah: {
    id: 'rawdah',
    nameEnglish: 'Rawdah Emerald & Gold',
    nameUrdu: 'زمردِ روضہ و طلائی',
    nameArabic: 'الزمرد النبوي والذهب',
    descriptionEn: 'Prophetic Green Dome, Medina Gold, and warm sandstone.',
    primaryColor: '#064E3B',
    accentGold: '#D4AF37',
    surfaceColor: '#FDFBF7',
  },
  kiswah: {
    id: 'kiswah',
    nameEnglish: 'Kiswah Midnight & Gold (OLED)',
    nameUrdu: 'شبِ کعبہ و طلائی کسوہ',
    nameArabic: 'كسوة الكعبة والذهب (ليلي)',
    descriptionEn: 'Pure Kaaba Kiswah charcoal, radiant gold, and OLED battery saving.',
    primaryColor: '#0F172A',
    accentGold: '#F59E0B',
    surfaceColor: '#070D14',
  },
  damascus: {
    id: 'damascus',
    nameEnglish: 'Damascene Parchment & Sepia',
    nameUrdu: 'ورقِ دمشقی و سیپیا',
    nameArabic: 'الورق الدمشقي الكلاسيكي',
    descriptionEn: 'Classical antique manuscript paper for hours of glare-free study.',
    primaryColor: '#78350F',
    accentGold: '#B45309',
    surfaceColor: '#F4ECD8',
  },
  lapis: {
    id: 'lapis',
    nameEnglish: 'Isfahan Lapis & Mosque Blue',
    nameUrdu: 'نیلگوں کاشی و لاجوردی',
    nameArabic: 'اللازورد والموزاييك الأندلسي',
    descriptionEn: 'Historic mosque ceramic tilework with cobalt and silver sheen.',
    primaryColor: '#0B192C',
    accentGold: '#008DDA',
    surfaceColor: '#06101E',
  },
};

interface ThemeContextType {
  theme: SacredTheme;
  setTheme: (theme: SacredTheme) => void;
  activeThemeMeta: ThemeMeta;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'rawdah',
  setTheme: () => {},
  activeThemeMeta: SACRED_THEMES.rawdah,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<SacredTheme>('rawdah');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('amal_sacred_theme') as SacredTheme | null;
      if (savedTheme && SACRED_THEMES[savedTheme]) {
        setThemeState(savedTheme);
        applyThemeClass(savedTheme);
      } else {
        // Fallback: check legacy tahajjud flag
        const isTahajjud = localStorage.getItem('amal_tahajjud_mode') === 'true';
        if (isTahajjud) {
          setThemeState('kiswah');
          applyThemeClass('kiswah');
        } else {
          applyThemeClass('rawdah');
        }
      }
    }
  }, []);

  const applyThemeClass = (targetTheme: SacredTheme) => {
    if (typeof document === 'undefined') return;
    document.body.classList.remove('theme-rawdah', 'theme-kiswah', 'theme-damascus', 'theme-lapis', 'theme-tahajjud');
    if (targetTheme === 'kiswah') {
      document.body.classList.add('theme-kiswah', 'theme-tahajjud');
    } else {
      document.body.classList.add(`theme-${targetTheme}`);
    }
  };

  const setTheme = (newTheme: SacredTheme) => {
    setThemeState(newTheme);
    applyThemeClass(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_sacred_theme', newTheme);
      localStorage.setItem('amal_tahajjud_mode', newTheme === 'kiswah' ? 'true' : 'false');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, activeThemeMeta: SACRED_THEMES[theme] || SACRED_THEMES.rawdah }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
