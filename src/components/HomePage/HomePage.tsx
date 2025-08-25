'use client';

import React from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { FeaturesSection } from './FeaturesSection';
import { CarsSection } from './CarsSection';
import { ContactSection } from './ContactSection';
import { SnackbarProvider, useSnackbar } from './SnackbarProvider';

function HomePageContent() {
  const { currentLang } = useTranslations();
  const { showSnackbar } = useSnackbar();

  return (
    <>
      <HeroSection currentLang={currentLang} onShowSnackbar={showSnackbar} />
      <AboutSection currentLang={currentLang} />
      <FeaturesSection currentLang={currentLang} />
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
