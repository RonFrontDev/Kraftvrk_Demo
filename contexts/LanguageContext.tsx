
import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { translations, isLanguageCode, LanguageCode } from '../i18n';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const getInitialLanguage = (): LanguageCode => {
    const browserLang = navigator.language.split('-')[0];
    if (isLanguageCode(browserLang)) {
      return browserLang;
    }
    return 'en';
  };

  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
    }
    return result || key;
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
