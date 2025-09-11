'use client';

import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { QuickBookingForm } from '../QuickBookingForm';
import { HeroSectionProps } from './HeroSection.types';
import { styles } from './HeroSection.styles';
import { getHeroTexts } from './HeroSection.const';

function HeroSection({ currentLang, onShowSnackbar }: HeroSectionProps) {
  const texts = getHeroTexts(currentLang);

  return (
    <Box id="body" sx={styles.heroContainer}>
      {/* Dark Overlay */}
      <Box sx={styles.darkOverlay} />

      <Container maxWidth="lg" sx={styles.contentContainer}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Quick Booking Form */}
          <Grid size={{ xs: 12, md: 5 }}>
            <QuickBookingForm
              currentLang={currentLang}
              onShowSnackbar={onShowSnackbar}
            />
          </Grid>

          {/* Right Side - Hero Content */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={styles.heroContent}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={styles.mainTitle}
              >
                {texts.mainTitle}
              </Typography>

              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={styles.subtitle}
              >
                {texts.subtitle}
              </Typography>

              <Typography variant="h2" component="p" sx={styles.description}>
                {texts.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;
