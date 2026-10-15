import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'ID' | 'EN';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (id: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'ID',
  setLang: () => {},
  toggleLang: () => {},
  t: (id) => id,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('porto_lang') as Language;
      if (saved === 'ID' || saved === 'EN') return saved;
    }
    return 'ID';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('porto_lang', lang);
      document.documentElement.lang = lang === 'ID' ? 'id' : 'en';
    }
  }, [lang]);

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
  };

  const toggleLang = () => {
    setLangState((prev) => (prev === 'ID' ? 'EN' : 'ID'));
  };

  const t = (id: string, en: string) => (lang === 'ID' ? id : en);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
