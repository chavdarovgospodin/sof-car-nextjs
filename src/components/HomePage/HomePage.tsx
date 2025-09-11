'use client';

import React from 'react';
import { useTranslations } from '../../hooks/useTranslations';
import {
  HeroSection,
  AboutSection,
  CarsSection,
  ContactSection,
} from './index';
import { SnackbarProvider, useSnackbar } from '@/providers/SnackbarProvider';

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
