'use client';

import React from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ContactSection } from './ContactSection';
import { SnackbarProvider, useSnackbar } from './SnackbarProvider';
import { CarsSection } from './CarsSection';

function HomePageContent() {
  const { currentLang } = useTranslations();
  const { showSnackbar } = useSnackbar();

  return (
    <>
      <HeroSection currentLang={currentLang} onShowSnackbar={showSnackbar} />
      <AboutSection currentLang={currentLang} />
      <CarsSection currentLang={currentLang} />
      <ContactSection currentLang={currentLang} onShowSnackbar={showSnackbar} />
    </>
  );
}

export function HomePage() {
  return (
    <SnackbarProvider>
      <HomePageContent />
    </SnackbarProvider>
  );
}
