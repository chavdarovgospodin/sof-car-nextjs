'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import Image from 'next/image';
import { AboutSectionProps } from './AboutSection.types';
import { styles } from './AboutSection.styles';
import { getAboutTexts, getInfoBoxes, getFeatures } from './AboutSection.const';

function AboutSection({ currentLang }: AboutSectionProps) {
  const texts = getAboutTexts(currentLang);
  const infoBoxes = getInfoBoxes(currentLang);
  const features = getFeatures(currentLang);

  return (
    <Box id="about" sx={styles.section}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }} sx={styles.imageContainer}>
            <Image
              src="/about.webp"
              alt="About SofCar"
              width={600}
              height={400}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              gutterBottom
              sx={styles.title}
            >
              {texts.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {texts.description}
            </Typography>
          </Grid>
        </Grid>

        {/* Info Boxes */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {infoBoxes.map((box, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Paper elevation={2} sx={styles.infoBox}>
                <Box sx={styles.iconContainer}>{box.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {box.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {box.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Why Choose Us */}
        <Box sx={styles.whyChooseUs}>
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={styles.whyChooseUsTitle}
          >
            {texts.whyChooseUsTitle}
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <List>
                {features.slice(0, 3).map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText primary={feature.text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <List>
                {features.slice(3).map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: 'success.main' }} />
                    </ListItemIcon>
                    <ListItemText primary={feature.text} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutSection;
