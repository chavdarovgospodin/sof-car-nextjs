'use client';

import { useLanguageInit } from '@/hooks/useLanguageInit';

export function LanguageInit() {
  useLanguageInit();
  return null; // This component doesn't render anything
}
