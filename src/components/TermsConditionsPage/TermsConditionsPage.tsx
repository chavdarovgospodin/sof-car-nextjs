'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { TermsConditionsPageProps } from './TermsConditionsPage.types';
import { texts, enTexts } from './TermsConditionsPage.lang';
import { styles } from './TermsConditionsPage.styles';
import {
  createRentalConditions,
  createRentalDocuments,
  createCancellationRules,
  createDeliveryOptions,
  createInsuranceTypes,
  createPaymentTerms,
  createContactInfo,
  rentalConditionIcon,
  documentIcon,
  cancellationIcons,
  deliveryIcon,
  insuranceIcon,
  paymentIcon,
} from './TermsConditionsPage.const';
import { APP_CONFIG } from '../../utils/constants';

export function TermsConditionsPage({ lang }: TermsConditionsPageProps) {
  const [currentLang, setCurrentLang] = useState('bg');

  useEffect(() => {
    lang.then(setCurrentLang);
  }, [lang]);

  const currentTexts = currentLang === 'bg' ? texts : enTexts;
  const rentalConditions = createRentalConditions(currentTexts);
  const rentalDocuments = createRentalDocuments(currentTexts);
  const cancellationRules = createCancellationRules(currentTexts);
  const deliveryOptions = createDeliveryOptions(currentTexts);
  const insuranceTypes = createInsuranceTypes(currentTexts);
  const paymentTerms = createPaymentTerms(currentTexts);
  const contactInfo = createContactInfo(currentTexts);

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
        {/* General Terms */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.generalTerms.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.generalTerms.description}
          </Typography>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={styles.subsectionTitle}
          >
            {currentTexts.sections.generalTerms.rentalConditions.title}
          </Typography>
          <List>
            {rentalConditions.map((condition, index) => (
              <ListItem key={index}>
                <ListItemIcon>{rentalConditionIcon}</ListItemIcon>
                <ListItemText primary={condition.text} />
              </ListItem>
            ))}
          </List>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={styles.subsectionTitle}
          >
            {currentTexts.sections.generalTerms.rentalDocuments.title}
          </Typography>
          <List>
            {rentalDocuments.map((document, index) => (
              <ListItem key={index}>
                <ListItemIcon>{documentIcon}</ListItemIcon>
                <ListItemText primary={document.text} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Cancellation Policy */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.cancellationPolicy.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.cancellationPolicy.description}
          </Typography>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={styles.subsectionTitle}
          >
            {currentTexts.sections.cancellationPolicy.before24h.title}
          </Typography>
          <List>
            {cancellationRules.before24h.map((rule, index) => (
              <ListItem key={index}>
                <ListItemIcon>{cancellationIcons.before24h}</ListItemIcon>
                <ListItemText primary={rule.text} />
              </ListItem>
            ))}
          </List>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={styles.subsectionTitle}
          >
            {currentTexts.sections.cancellationPolicy.within24h.title}
          </Typography>
          <List>
            {cancellationRules.within24h.map((rule, index) => (
              <ListItem key={index}>
                <ListItemIcon>{cancellationIcons.within24h}</ListItemIcon>
                <ListItemText primary={rule.text} />
              </ListItem>
            ))}
          </List>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={styles.subsectionTitle}
          >
            {currentTexts.sections.cancellationPolicy.sameDay.title}
          </Typography>
          <List>
            {cancellationRules.sameDay.map((rule, index) => (
              <ListItem key={index}>
                <ListItemIcon>{cancellationIcons.sameDay}</ListItemIcon>
                <ListItemText primary={rule.text} />
              </ListItem>
            ))}
          </List>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={styles.subsectionTitle}
          >
            {currentTexts.sections.cancellationPolicy.forceMajeure.title}
          </Typography>
          <List>
            {cancellationRules.forceMajeure.map((rule, index) => (
              <ListItem key={index}>
                <ListItemIcon>{cancellationIcons.forceMajeure}</ListItemIcon>
                <ListItemText primary={rule.text} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Delivery Policy */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.deliveryPolicy.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.deliveryPolicy.description}
          </Typography>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={styles.subsectionTitle}
          >
            {currentTexts.sections.deliveryPolicy.pickup.title}
          </Typography>
          <List>
            {deliveryOptions.map((option, index) => (
              <ListItem key={index}>
                <ListItemIcon>{deliveryIcon}</ListItemIcon>
                <ListItemText primary={option.text} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Insurance and Liability */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.insurance.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.insurance.description}
          </Typography>
          <List>
            {insuranceTypes.map((insurance, index) => (
              <ListItem key={index}>
                <ListItemIcon>{insuranceIcon}</ListItemIcon>
                <ListItemText
                  primary={<strong>{insurance.title}</strong>}
                  secondary={insurance.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Payment Terms */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.paymentTerms.title}
          </Typography>
          <List>
            {paymentTerms.map((term, index) => (
              <ListItem key={index}>
                <ListItemIcon>{paymentIcon}</ListItemIcon>
                <ListItemText
                  primary={<strong>{term.title}</strong>}
                  secondary={term.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Contact Information */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.contact.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.contact.description}
          </Typography>
          <Box sx={styles.contactInfo}>
            <Typography variant="body1" paragraph>
              <strong>{contactInfo.email}</strong> {APP_CONFIG.email}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>{currentTexts.sections.contact.info.phone}</strong>{' '}
              {contactInfo.phone}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>{currentTexts.sections.contact.info.address}</strong>{' '}
              {contactInfo.address}, България
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>
                {currentTexts.sections.contact.info.businessHours}
              </strong>{' '}
              {contactInfo.businessHours}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
