// Client-side localStorage functions
export const getLangFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('lang');
};

export const setLangToStorage = (lang: 'en' | 'bg'): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('lang', lang);
  // Also set cookie for server-side access
  document.cookie = `lang=${lang}; path=/; max-age=31536000`; // 1 year
};

// Server-side cookie functions
export const getLangFromCookies = (
  cookieHeader: string | undefined
): string | null => {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/lang=([^;]+)/);
  return match ? match[1] : null;
};
