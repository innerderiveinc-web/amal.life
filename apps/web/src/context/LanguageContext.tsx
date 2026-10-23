import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppLanguage = 'en' | 'ur' | 'ar';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  isUrdu: boolean;
  isArabic: boolean;
  isEnglish: boolean;
  t: (en: string, ur?: string, ar?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  isUrdu: false,
  isArabic: false,
  isEnglish: true,
  t: (en) => en,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>('en');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = (localStorage.getItem('amal_app_language') as AppLanguage) || 'en';
      setLanguageState(saved);
      document.documentElement.dir = saved === 'ur' || saved === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_app_language', lang);
      document.documentElement.dir = lang === 'ur' || lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      window.dispatchEvent(new CustomEvent('amal_language_changed', { detail: { language: lang } }));
    }
  };

  const t = (en: string, ur?: string, ar?: string): string => {
    if (language === 'ur' && ur) return ur;
    if (language === 'ar' && ar) return ar;
    return en;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isUrdu: language === 'ur',
        isArabic: language === 'ar',
        isEnglish: language === 'en',
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
