'use client';

import React from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { FeaturesSectionProps } from './FeaturesSection.types';
import { styles } from './FeaturesSection.styles';
import { getFeatures, getFeaturesTexts } from './FeaturesSection.const';

function FeaturesSection({ currentLang }: FeaturesSectionProps) {
  const features = getFeatures(currentLang);
  const texts = getFeaturesTexts(currentLang);

  return (
    <Box sx={styles.section}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" sx={styles.title}>
          {texts.title}
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Paper elevation={2} sx={styles.featureCard}>
                <Box sx={styles.featureIcon}>{feature.icon}</Box>
                <Typography variant="h6" sx={styles.featureTitle}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={styles.featureDescription}>
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

export default FeaturesSection;
