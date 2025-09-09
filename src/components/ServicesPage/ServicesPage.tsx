'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { ServicesPageProps } from './ServicesPage.types';
import { texts, enTexts } from './ServicesPage.lang';
import { styles } from './ServicesPage.styles';
import {
  createServiceTypes,
  createCarClasses,
  createAdditionalServices,
  serviceTypeIcon,
  carFeatureIcon,
  carModelIcon,
  additionalServiceIcons,
} from './ServicesPage.const';

export function ServicesPage({ lang }: ServicesPageProps) {
  const [currentLang, setCurrentLang] = useState('bg');

  useEffect(() => {
    lang.then(setCurrentLang);
  }, [lang]);

  const currentTexts = currentLang === 'bg' ? texts : enTexts;
  const serviceTypes = createServiceTypes(currentTexts);
  const carClasses = createCarClasses(currentTexts);
  const additionalServices = createAdditionalServices(currentTexts);

  return (
    <Box sx={styles.pageContainer}>
      {/* Hero Section */}
      <Box sx={styles.heroSection}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            textAlign="center"
            gutterBottom
            sx={styles.heroTitle}
          >
            {currentTexts.title}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            textAlign="center"
            sx={styles.heroSubtitle}
          >
            {currentTexts.subtitle}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={styles.mainContent}>
        {/* Main Services */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.mainServices.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.mainServices.description}
          </Typography>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={styles.subsectionTitle}
          >
            {currentTexts.sections.mainServices.carRental.title}
          </Typography>
          <List>
            {serviceTypes.map((service, index) => (
              <ListItem key={index}>
                <ListItemIcon>{serviceTypeIcon}</ListItemIcon>
                <ListItemText
                  primary={<strong>{service.title}</strong>}
                  secondary={service.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Car Classes */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.carClasses.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.carClasses.description}
          </Typography>

          {carClasses.map((carClass, classIndex) => (
            <Box key={classIndex}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={styles.classTitle}
              >
                {carClass.name}
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>
                    {currentTexts.labels.features}
                  </Typography>
                  <List dense>
                    {carClass.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex}>
                        <ListItemIcon>{carFeatureIcon}</ListItemIcon>
                        <ListItemText
                          primary={<strong>{feature.title}</strong>}
                          secondary={feature.description}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>
                    {currentTexts.labels.models}
                  </Typography>
                  <List dense>
                    {carClass.models.map((model, modelIndex) => (
                      <ListItem key={modelIndex}>
                        <ListItemIcon>{carModelIcon}</ListItemIcon>
                        <ListItemText
                          primary={model.name}
                          secondary={model.description}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
              {classIndex < carClasses.length - 1 && (
                <Divider sx={styles.divider} />
              )}
            </Box>
          ))}
        </Paper>

        {/* Additional Services */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.additionalServices.title}
          </Typography>
          <Grid container spacing={3}>
            {additionalServices.map((service, index) => {
              const serviceKey = Object.keys(additionalServiceIcons)[
                index
              ] as keyof typeof additionalServiceIcons;
              return (
                <Grid key={index} size={{ xs: 12, md: 6 }}>
                  <Box sx={styles.serviceCard}>
                    {additionalServiceIcons[serviceKey]}
                    <Typography variant="h6">{service.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {service.description}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
