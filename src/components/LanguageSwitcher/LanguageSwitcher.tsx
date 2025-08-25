'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { SUPPORTED_LANGUAGES } from '@/utils/constants';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const currentLang = pathname.split('/')[1] || 'bg';

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
        sx={{
          mr: 2,
          minWidth: '120px',
          width: '160px',
          textTransform: 'none',
          borderColor: 'primary.main',
          color: 'primary.main',
          '&:hover': {
            borderColor: 'primary.dark',
            backgroundColor: 'primary.light',
            color: 'primary.dark',
          },
        }}
      >
        {currentLanguage?.flag} {currentLanguage?.name}
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
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={lang.code === currentLang}
            sx={{
              minWidth: '120px',
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.light',
                },
              },
            }}
          >
            {lang.flag} {lang.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
