import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppLanguage = 'en' | 'ur' | 'ar' | 'roman';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => void;
  isUrdu: boolean;
  isArabic: boolean;
  isEnglish: boolean;
  isRomanUrdu: boolean;
  isRtl: boolean;
  scriptLineHeight: number;
  scriptFontFamily: string;
  t: (en: string, ur?: string, ar?: string, roman?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  isUrdu: false,
  isArabic: false,
  isEnglish: true,
  isRomanUrdu: false,
  isRtl: false,
  scriptLineHeight: 1.55,
  scriptFontFamily: 'var(--font-sans)',
  t: (en) => en,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>('en');

  const applyScriptToDocument = (lang: AppLanguage) => {
    if (typeof document === 'undefined') return;
    const isRtlLang = lang === 'ur' || lang === 'ar';
    document.documentElement.dir = isRtlLang ? 'rtl' : 'ltr';
    document.documentElement.lang = lang === 'roman' ? 'ur-Latn' : lang;
    document.documentElement.setAttribute('data-script', lang);

    document.body.classList.remove('script-en', 'script-ur', 'script-ar', 'script-roman');
    document.body.classList.add(`script-${lang}`);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = (localStorage.getItem('amal_app_language') as AppLanguage) || 'en';
      setLanguageState(saved);
      applyScriptToDocument(saved);
    }
  }, []);

  const setLanguage = (lang: AppLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('amal_app_language', lang);
      applyScriptToDocument(lang);
      window.dispatchEvent(new CustomEvent('amal_language_changed', { detail: { language: lang } }));
    }
  };

  const t = (en: string, ur?: string, ar?: string, roman?: string): string => {
    if (language === 'roman') return roman || en;
    if (language === 'ur' && ur) return ur;
    if (language === 'ar' && ar) return ar;
    return en;
  };

  const isRtl = language === 'ur' || language === 'ar';
  const scriptLineHeight = language === 'ur' ? 2.05 : language === 'ar' ? 1.95 : 1.55;
  const scriptFontFamily =
    language === 'ur'
      ? 'var(--font-urdu)'
      : language === 'ar'
      ? 'var(--font-arabic)'
      : 'var(--font-sans)';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isUrdu: language === 'ur',
        isArabic: language === 'ar',
        isEnglish: language === 'en',
        isRomanUrdu: language === 'roman',
        isRtl,
        scriptLineHeight,
        scriptFontFamily,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
