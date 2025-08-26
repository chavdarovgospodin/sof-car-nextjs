'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Phone,
  Close,
  ExpandMore,
  Info,
} from '@mui/icons-material';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { APP_CONFIG } from '@/utils/constants';
import { useTranslations } from '@/hooks/useTranslations';
import { useState } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoAnchorEl, setInfoAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t, currentLang } = useTranslations();

  // Use custom scroll lock hook
  useScrollLock(mobileOpen || Boolean(infoAnchorEl));

  const navigationItems = [
    {
      href: `/${currentLang}#about`,
      label: currentLang === 'bg' ? 'За нас' : 'About Us',
    },
    {
      href: `/${currentLang}/booking`,
      label: currentLang === 'bg' ? 'Резервация' : 'Reservation',
    },
    {
      href: `/${currentLang}#offers`,
      label: currentLang === 'bg' ? 'Автомобили' : 'Cars',
    },
    {
      href: `/${currentLang}#footer`,
      label: currentLang === 'bg' ? 'Контакти' : 'Contact',
    },
  ];

  const infoItems = [
    {
      href: `/${currentLang}/privacy-policy`,
      label:
        currentLang === 'bg' ? 'Политика за поверителност' : 'Privacy Policy',
    },
    {
      href: `/${currentLang}/terms-conditions`,
      label: currentLang === 'bg' ? 'Общи условия' : 'Terms & Conditions',
    },
    {
      href: `/${currentLang}/pricing`,
      label: currentLang === 'bg' ? 'Цени и тарифи' : 'Pricing',
    },
    {
      href: `/${currentLang}/services`,
      label: currentLang === 'bg' ? 'Услуги и автомобили' : 'Services & Cars',
    },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleInfoMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setInfoAnchorEl(event.currentTarget);
  };

  const handleInfoMenuClose = () => {
    setInfoAnchorEl(null);
  };

  const drawer = (
    <Box sx={{ width: 280 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Image
          src="/logo_main.webp"
          alt="SofCar Logo"
          width={120}
          height={75}
          style={{ objectFit: 'contain' }}
        />
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>

      <List sx={{ p: 2 }}>
        {navigationItems.map((item) => (
          <ListItem
            key={item.href}
            component="a"
            href={item.href}
            onClick={handleDrawerToggle}
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              borderRadius: 1,
              mb: 1,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        {/* Info Dropdown in Mobile */}
        <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, color: 'text.secondary' }}
          >
            {currentLang === 'bg' ? 'Информация' : 'Information'}
          </Typography>
          {infoItems.map((infoItem) => (
            <ListItem
              key={infoItem.href}
              component="a"
              href={infoItem.href}
              onClick={handleDrawerToggle}
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                pl: 3,
                py: 0.5,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemText
                primary={infoItem.label}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </ListItem>

        <ListItem sx={{ justifyContent: 'center', mt: 2 }}>
          <LanguageSwitcher />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'white',
        opacity: 0.9,
        color: 'text.primary',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: '0 !important' }}>
        {/* Logo */}
        <Link
          href={`/${currentLang}`}
          style={{ textDecoration: 'none', outline: 'none', border: 'none' }}
        >
          <Image
            src="/logo_main.webp"
            alt="SofCar Logo"
            width={160}
            height={100}
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                href={item.href}
                color="inherit"
                sx={{
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}

            {/* Info Dropdown */}
            <Button
              onClick={handleInfoMenuOpen}
              color="inherit"
              endIcon={<ExpandMore />}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              {currentLang === 'bg' ? 'Информация' : 'Information'}
            </Button>

            <Menu
              anchorEl={infoAnchorEl}
              open={Boolean(infoAnchorEl)}
              onClose={handleInfoMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
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
                      left: '50%',
                      width: 0,
                      height: 0,
                      transform: 'translateX(-50%)',
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderBottom: '8px solid white',
                      filter: 'drop-shadow(0 -1px 2px rgba(0,0,0,0.1))',
                    },
                  },
                },
              }}
            >
              {infoItems.map((infoItem) => (
                <MenuItem
                  key={infoItem.href}
                  component="a"
                  href={infoItem.href}
                  onClick={handleInfoMenuClose}
                  sx={{ minWidth: 200 }}
                >
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  {infoItem.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        )}

        {/* Right side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Phone number */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              marginRight: 2,
            }}
          >
            <Phone sx={{ fontSize: 20, color: 'primary.main' }} />
            <Link
              href={`tel:${APP_CONFIG.phone}`}
              color="inherit"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                outline: 'none',
                border: 'none',
              }}
            >
              {APP_CONFIG.phone}
            </Link>
          </Box>

          {/* Language Switcher */}
          {!isMobile && <LanguageSwitcher />}

          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Box>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
          disableScrollLock: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
