'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import bgTranslations from '@/locales/bg/common.json';
import enTranslations from '@/locales/en/common.json';

const translations = {
  bg: bgTranslations,
  en: enTranslations,
};

export function useTranslations() {
  const pathname = usePathname();

  const currentLang = useMemo(() => {
    const lang = pathname.split('/')[1];
    return lang === 'en' ? 'en' : 'bg';
  }, [pathname]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: unknown = translations[currentLang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(
          `Translation key not found: ${key} for language: ${currentLang}`
        );
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return {
    t,
    currentLang,
    isEnglish: currentLang === 'en',
    isBulgarian: currentLang === 'bg',
  };
}
