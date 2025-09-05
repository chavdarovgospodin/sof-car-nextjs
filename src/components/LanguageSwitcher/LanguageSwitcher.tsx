'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';
import { SUPPORTED_LANGUAGES } from '@/utils/constants';

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
        sx={{
          p: 1,
          mr: isMobile ? 0 : 2,
          minWidth: isMobile ? '30px' : '120px',
          width: isMobile ? '30px' : '160px',
          textTransform: 'none',
          borderColor: isMobile ? 'white' : 'primary.main',
          color: 'primary.main',
          '&:hover': {
            borderColor: 'primary.dark',
            backgroundColor: 'primary.light',
            color: 'primary.dark',
          },
        }}
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
            sx: {
              overflow: 'visible',
              mt: 1,
              transition: 'all 0.2s ease-in-out',
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 20,
                width: 0,
                height: 0,
                transform: 'translateX(50%)',
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '8px solid white',
                filter: 'drop-shadow(0 -1px 2px rgba(0,0,0,0.1))',
              },
            },
          },
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
