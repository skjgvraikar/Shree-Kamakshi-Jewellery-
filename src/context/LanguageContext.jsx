import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('skj_lang') || 'en';
  });

  const setLang = (newLang) => {
    const validLang = newLang === 'kn' ? 'kn' : 'en';
    setLangState(validLang);
    localStorage.setItem('skj_lang', validLang);
    document.documentElement.lang = validLang;
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'kn' : 'en');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = translations[lang] || translations.en;
  const isKn = lang === 'kn';

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t, isKn }}>
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

export default LanguageContext;

