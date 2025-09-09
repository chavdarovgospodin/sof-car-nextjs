'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { PricingPageProps } from './PricingPage.types';
import { texts, enTexts } from './PricingPage.lang';
import { styles } from './PricingPage.styles';
import {
  createAdditionalFees,
  createPricingData,
  createIncludedFeatures,
  createImportantNotes,
} from './PricingPage.const';

export function PricingPage({ lang }: PricingPageProps) {
  const [currentLang, setCurrentLang] = useState('bg');

  useEffect(() => {
    lang.then(setCurrentLang);
  }, [lang]);

  const currentTexts = currentLang === 'bg' ? texts : enTexts;

  const pricingData = createPricingData(currentTexts);
  const additionalFees = createAdditionalFees(currentTexts);
  const includedFeatures = createIncludedFeatures(currentTexts);
  const importantNotes = createImportantNotes(currentTexts);

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
        {/* Base Prices */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.basePrices.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.basePrices.description}
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">
                      {currentTexts.basePrices.table.carClass}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {currentTexts.basePrices.table.dailyRate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {currentTexts.basePrices.table.deposit}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {currentTexts.basePrices.table.features}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pricingData.map((row, index) => (
                  <TableRow key={index} sx={styles.tableRow}>
                    <TableCell>
                      <Box>
                        <Typography variant="h6" sx={styles.classTitle}>
                          {row.class}
                        </Typography>
                        <Typography variant="body2" sx={styles.classModels}>
                          {row.models}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={styles.priceContainer}>
                        <Typography variant="h4" sx={styles.priceValue}>
                          {row.price}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="span"
                          sx={styles.priceCurrency}
                        >
                          {currentTexts.basePrices.currency}
                        </Typography>
                        <Typography variant="body2" sx={styles.pricePerDay}>
                          /{currentTexts.basePrices.perDay}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={styles.depositContainer}>
                        <Typography variant="h6" sx={styles.depositValue}>
                          {row.deposit} {currentTexts.basePrices.currency}
                        </Typography>
                        <Typography variant="body2" sx={styles.depositLabel}>
                          {currentTexts.basePrices.depositLabel}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <List dense>
                        {row.features.map((feature, featureIndex) => (
                          <ListItem key={featureIndex} sx={styles.featureItem}>
                            <ListItemIcon sx={styles.featureIcon}>
                              <CheckCircle
                                color="primary"
                                sx={{ fontSize: '1rem' }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Additional Fees */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.additionalFees.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.additionalFees.description}
          </Typography>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={styles.pickupDeliveryTitle}
          >
            {currentTexts.additionalFees.pickupDelivery.title}
          </Typography>

          <Grid container spacing={2}>
            {additionalFees.map((fee, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Paper sx={styles.feeCard}>
                  <Box sx={styles.feeIcon}>{fee.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {fee.service}
                  </Typography>
                  <Chip
                    label={fee.fee}
                    color={
                      fee.fee ===
                      currentTexts.additionalFees.pickupDelivery.fees.noFee
                        ? 'success'
                        : 'primary'
                    }
                    variant="outlined"
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* What's Included */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.whatsIncluded.title}
          </Typography>
          <Grid container spacing={3} sx={styles.includedFeaturesGrid}>
            <Grid size={{ xs: 12, md: 6 }}>
              <List>
                {includedFeatures.slice(0, 3).map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary={<strong>{feature.title}</strong>}
                      secondary={feature.description}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <List>
                {includedFeatures.slice(3).map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary={<strong>{feature.title}</strong>}
                      secondary={feature.description}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>

        {/* Important Notes */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.importantNotes.title}
          </Typography>
          <List>
            {importantNotes.map((note, index) => (
              <ListItem key={index}>
                <ListItemIcon>{note.icon}</ListItemIcon>
                <ListItemText
                  primary={<strong>{note.title}</strong>}
                  secondary={note.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
