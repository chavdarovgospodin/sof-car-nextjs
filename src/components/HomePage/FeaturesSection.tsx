'use client';

import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { DirectionsCar, Security, Support, Payment } from '@mui/icons-material';

interface FeaturesSectionProps {
  currentLang: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeaturesSection({ currentLang }: FeaturesSectionProps) {
  const features: Feature[] = [
    {
      icon: <DirectionsCar sx={{ fontSize: 40, color: '#1976d2' }} />,
      title:
        currentLang === 'bg' ? 'Широка гама автомобили' : 'Wide Car Selection',
      description:
        currentLang === 'bg'
          ? 'Избирайте от нашата разнообразна гама автомобили за всеки бюджет и нужда'
          : 'Choose from our diverse range of cars for every budget and need',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: currentLang === 'bg' ? 'Пълна застраховка' : 'Full Insurance',
      description:
        currentLang === 'bg'
          ? 'Всички наши автомобили са напълно застраховани за вашата спокойност'
          : 'All our cars are fully insured for your peace of mind',
    },
    {
      icon: <Support sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: currentLang === 'bg' ? '24/7 поддръжка' : '24/7 Support',
      description:
        currentLang === 'bg'
          ? 'Нашият екип е на разположение 24/7 за всякакви въпроси или проблеми'
          : 'Our team is available 24/7 for any questions or issues',
    },
    {
      icon: <Payment sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: currentLang === 'bg' ? 'Прозрачни цени' : 'Transparent Pricing',
      description:
        currentLang === 'bg'
          ? 'Без скрити такси или неочаквани разходи - знаете точно какво плащате'
          : 'No hidden fees or unexpected costs - you know exactly what you pay',
    },
  ];

  return (
    <Box sx={{ padding: { xs: 4, md: 8 }, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: 'center',
            marginBottom: 6,
            color: '#1976d2',
            fontWeight: 'bold',
          }}
        >
          {currentLang === 'bg' ? 'Защо да изберете нас?' : 'Why Choose Us?'}
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper
                elevation={2}
                sx={{
                  padding: 3,
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <Box sx={{ marginBottom: 2 }}>{feature.icon}</Box>

                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    marginBottom: 2,
                    fontWeight: 'bold',
                    color: '#1976d2',
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
