'use client';

import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { QuickBookingForm } from './QuickBookingForm';

interface HeroSectionProps {
  currentLang: string;
  onShowSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

export function HeroSection({ currentLang, onShowSnackbar }: HeroSectionProps) {
  return (
    <Box
      id="body"
      sx={{
        backgroundImage:
          'url(/generated-image-f179045f-49f4-4402-880f-8663654edd10.jpeg)',
        backgroundSize: 'cover',
        backgroundPosition: '30% 70%',
        color: 'white',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: '65vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Dark Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
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
            <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '2.5rem', md: '3rem' },
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  mb: 3,
                }}
              >
                {currentLang === 'bg'
                  ? 'Коли под наем Соф Кар'
                  : 'Sof Car Rental'}
              </Typography>

              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 'normal',
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  mb: 4,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                }}
              >
                {currentLang === 'bg' ? 'град Ямбол' : 'Yambol City'}
              </Typography>

              <Typography
                variant="h2"
                component="p"
                sx={{
                  maxWidth: '600px',
                  mb: 4,
                  opacity: 0.95,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '1.2rem', md: '22px' },
                  fontFamily: 'Source Sans Pro, Helvetica, sans-serif',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  lineHeight: 1.6,
                }}
              >
                {currentLang === 'bg'
                  ? 'Изгодни и надеждни автомобили под наем за град Ямбол и цялата страна.'
                  : 'Affordable and reliable car rental service in Yambol and throughout the country.'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
