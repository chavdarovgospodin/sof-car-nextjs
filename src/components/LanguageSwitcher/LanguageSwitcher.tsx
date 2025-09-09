'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';
import { SUPPORTED_LANGUAGES } from '@/utils/constants';
import { styles } from './LanguageSwitcher.styles';

export function LanguageSwitcher({ isMobile }: { isMobile: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLang = pathname.split('/')[1] || 'bg';

  // Use custom scroll lock hook
  useScrollLock(Boolean(anchorEl));

  const handleLanguageChange = (langCode: string) => {
    const currentPath = pathname.replace(/^\/[a-z]{2}/, '');
    const newPath = `/${langCode}${currentPath}`;
    router.push(newPath);
    setAnchorEl(null);
  };

  const currentLanguage = SUPPORTED_LANGUAGES.find(
    (l) => l.code === currentLang
  );

  return (
    <>
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        variant="outlined"
        size="small"
        sx={styles.button(isMobile)}
      >
        {currentLanguage?.flag} {isMobile ? null : currentLanguage?.name}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        disableScrollLock={true}
        slotProps={{
          paper: {
            sx: styles.menuPaper,
          },
        }}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={lang.code === currentLang}
            sx={styles.menuItem}
          >
            {lang.flag} {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
