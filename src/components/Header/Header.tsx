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
import { LanguageSwitcher } from '../LanguageSwitcher';
import { APP_CONFIG } from '@/utils/constants';
import { useTranslations } from '@/hooks/useTranslations';
import { useState, useEffect } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { styles } from './Header.styles';
import { getNavigationItems, getInfoItems, getTexts } from './Header.const';
import { useBreakpoint } from '../../providers';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoAnchorEl, setInfoAnchorEl] = useState<null | HTMLElement>(null);
  const { isMobile, isSmallMobile } = useBreakpoint();
  const { currentLang } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  // Use custom scroll lock hook
  useScrollLock(mobileOpen || Boolean(infoAnchorEl));

  // Обработка на hash в URL-а за автоматично скролиране
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const sectionId = hash.substring(1); // Премахваме #
        // Изчакваме малко за да се зареди страницата
        setTimeout(() => {
          scrollToSection(sectionId);
          // Премахваме hash-а от URL-а след скролирането
          history.replaceState(null, '', window.location.pathname);
        }, 100);
      }
    }
  }, [pathname]); // Dependency on pathname to re-run when route changes

  const navigationItems = getNavigationItems(currentLang);
  const infoItems = getInfoItems(currentLang);
  const texts = getTexts(currentLang);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleInfoMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setInfoAnchorEl(event.currentTarget);
  };

  const handleInfoMenuClose = () => {
    setInfoAnchorEl(null);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleNavigationClick = (item: {
    isScroll: boolean;
    sectionId?: string;
    href?: string;
  }) => {
    if (item.isScroll && item.sectionId) {
      // Ако сме на друга страница (не на главната), първо навигираме към главната
      if (pathname !== `/${currentLang}` && pathname !== `/${currentLang}/`) {
        // Навигираме към главната страница с hash за да знае useEffect-а къде да скролира
        router.push(`/${currentLang}#${item.sectionId}`);
      } else {
        // Ако сме на главната страница, просто скролираме
        scrollToSection(item.sectionId);
      }
    } else if (!item.isScroll && item.href) {
      // За линкове без scroll (като about, booking) навигираме директно
      router.push(item.href);
    }
  };

  const drawer = (
    <Box sx={styles.drawerContent}>
      <Box sx={styles.drawerHeader}>
        <Image
          src="/logo_main.webp"
          alt="SofCar Logo"
          width={isSmallMobile ? 80 : 120}
          height={isSmallMobile ? 50 : 75}
          style={{ objectFit: 'contain' }}
        />
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>

      <List sx={styles.drawerList}>
        {navigationItems.map((item) => (
          <ListItem
            key={item.sectionId || item.href}
            component="div"
            onClick={() => {
              handleNavigationClick(item);
              handleDrawerToggle();
            }}
            sx={styles.drawerListItem}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}

        {/* Info Dropdown in Mobile */}
        <ListItem sx={styles.infoSection}>
          <Typography variant="subtitle2" sx={styles.infoSectionTitle}>
            {texts.information}
          </Typography>
          {infoItems.map((infoItem) => (
            <ListItem
              key={infoItem.href}
              component="a"
              href={infoItem.href}
              onClick={handleDrawerToggle}
              sx={styles.infoListItem}
            >
              <ListItemText
                primary={infoItem.label}
                primaryTypographyProps={{ variant: 'body2' }}
              />
            </ListItem>
          ))}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        {/* Logo */}
        <Link
          href={`/${currentLang}`}
          style={{
            textDecoration: 'none',
            outline: 'none',
            border: 'none',
            marginLeft: '-5px',
          }}
        >
          <Image
            src="/logo_main.webp"
            alt="SofCar Logo"
            width={isSmallMobile ? 100 : 160}
            height={isSmallMobile ? 70 : 100}
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box sx={styles.desktopNavigation}>
            {navigationItems.map((item) => (
              <Button
                key={item.sectionId || item.href}
                href={undefined}
                onClick={() => handleNavigationClick(item)}
                color="inherit"
                sx={styles.navButton}
              >
                {item.label}
              </Button>
            ))}

            {/* Info Dropdown */}
            <Button
              onClick={handleInfoMenuOpen}
              color="inherit"
              endIcon={<ExpandMore />}
              sx={styles.infoButton}
            >
              {texts.information}
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
                  sx: styles.infoMenu,
                },
              }}
            >
              {infoItems.map((infoItem) => (
                <MenuItem
                  key={infoItem.href}
                  component="a"
                  href={infoItem.href}
                  onClick={handleInfoMenuClose}
                  sx={styles.menuItem}
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
        <Box sx={styles.rightSide}>
          {isMobile && <LanguageSwitcher isMobile={isMobile} />}
          {/* Phone number */}

          <Box sx={styles.phoneContainer}>
            <Phone sx={styles.phoneIcon} />
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
          {!isMobile && <LanguageSwitcher isMobile={isMobile} />}

          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={styles.mobileMenuButton}
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
        sx={styles.drawer}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}
