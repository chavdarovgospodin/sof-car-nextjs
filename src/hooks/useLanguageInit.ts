'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getLangFromStorage, setLangToStorage } from '@/utils/localStorage';

export function useLanguageInit() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const currentLang = pathname.split('/')[1];
    const savedLang = getLangFromStorage();

    // If we're on root page and have saved language, redirect to it
    if (pathname === '/' && savedLang && savedLang !== currentLang) {
      router.replace(`/${savedLang}`);
      return;
    }

    // If we have a valid language in URL but no saved language, save current one
    if ((currentLang === 'en' || currentLang === 'bg') && !savedLang) {
      setLangToStorage(currentLang as 'en' | 'bg');
    }
  }, [pathname, router]);
}
