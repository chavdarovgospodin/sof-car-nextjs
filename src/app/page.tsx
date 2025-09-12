'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLangFromStorage } from '@/utils/localStorage';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Get saved language from localStorage or default to 'bg'
    const savedLang = getLangFromStorage();
    const validLang = savedLang === 'en' ? 'en' : 'bg';

    // Redirect to the appropriate language version
    router.replace(`/${validLang}`);
  }, [router]);

  // Show loading while redirecting
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div>Loading...</div>
    </div>
  );
}
