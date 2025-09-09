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
import { PrivacyPolicyPageProps } from './PrivacyPolicyPage.types';
import { texts, enTexts } from './PrivacyPolicyPage.lang';
import { styles } from './PrivacyPolicyPage.styles';
import {
  createCompanyInfo,
  createDataTypes,
  createPurposeTypes,
  createRetentionPeriods,
  createProtectionMeasures,
  createUserRights,
  companyInfoIcons,
  dataTypeIcon,
  purposeIcon,
  retentionIcon,
  protectionIcon,
  rightsIcon,
} from './PrivacyPolicyPage.const';
import { APP_CONFIG } from '../../utils/constants';

export function PrivacyPolicyPage({ lang }: PrivacyPolicyPageProps) {
  const [currentLang, setCurrentLang] = useState('bg');

  useEffect(() => {
    lang.then(setCurrentLang);
  }, [lang]);

  const currentTexts = currentLang === 'bg' ? texts : enTexts;
  const companyInfo = createCompanyInfo(currentTexts);
  const dataTypes = createDataTypes(currentTexts);
  const purposeTypes = createPurposeTypes(currentTexts);
  const retentionPeriods = createRetentionPeriods(currentTexts);
  const protectionMeasures = createProtectionMeasures(currentTexts);
  const userRights = createUserRights(currentTexts);

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
        {/* Introduction */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.introduction.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.introduction.content.paragraph1}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.introduction.content.paragraph2}
          </Typography>
        </Paper>

        {/* Data Controller */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.dataController.title}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>{companyInfoIcons.name}</ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentTexts.sections.dataController.fields.companyName}
                  </strong>
                }
                secondary={companyInfo.name}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>{companyInfoIcons.eic}</ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentTexts.sections.dataController.fields.eic}
                  </strong>
                }
                secondary={companyInfo.eic}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>{companyInfoIcons.address}</ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentTexts.sections.dataController.fields.address}
                  </strong>
                }
                secondary={companyInfo.address}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>{companyInfoIcons.phone}</ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentTexts.sections.dataController.fields.phone}
                  </strong>
                }
                secondary={companyInfo.phone}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>{companyInfoIcons.email}</ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentTexts.sections.dataController.fields.email}
                  </strong>
                }
                secondary={companyInfo.email}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>{companyInfoIcons.manager}</ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentTexts.sections.dataController.fields.manager}
                  </strong>
                }
                secondary={companyInfo.manager}
              />
            </ListItem>
          </List>
        </Paper>

        {/* Personal Data Collection */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.dataCollection.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.dataCollection.description}
          </Typography>
          <List>
            {dataTypes.map((dataType, index) => (
              <ListItem key={index}>
                <ListItemIcon>{dataTypeIcon}</ListItemIcon>
                <ListItemText
                  primary={<strong>{dataType.title}</strong>}
                  secondary={dataType.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Purpose of Data Processing */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.dataUsage.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.dataUsage.description}
          </Typography>
          <List>
            {purposeTypes.map((purpose, index) => (
              <ListItem key={index}>
                <ListItemIcon>{purposeIcon}</ListItemIcon>
                <ListItemText
                  primary={<strong>{purpose.title}</strong>}
                  secondary={purpose.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Data Retention */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.dataRetention.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.dataRetention.description}
          </Typography>
          <List>
            {retentionPeriods.map((period, index) => (
              <ListItem key={index}>
                <ListItemIcon>{retentionIcon}</ListItemIcon>
                <ListItemText
                  primary={<strong>{period.title}</strong>}
                  secondary={period.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Data Protection */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.dataProtection.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.dataProtection.description}
          </Typography>
          <List>
            {protectionMeasures.map((measure, index) => (
              <ListItem key={index}>
                <ListItemIcon>{protectionIcon}</ListItemIcon>
                <ListItemText
                  primary={<strong>{measure.title}</strong>}
                  secondary={measure.description}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Your Rights */}
        <Paper sx={styles.paper}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={styles.sectionTitle}
          >
            {currentTexts.sections.userRights.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentTexts.sections.userRights.description}
          </Typography>
          <List>
            {userRights.map((right, index) => (
              <ListItem key={index}>
                <ListItemIcon>{rightsIcon}</ListItemIcon>
                <ListItemText
                  primary={<strong>{right.title}</strong>}
                  secondary={right.description}
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
              <strong>{currentTexts.sections.contact.fields.email}</strong>{' '}
              {APP_CONFIG.email}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>{currentTexts.sections.contact.fields.phone}</strong> +359
              87 999 4212
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>{currentTexts.sections.contact.fields.address}</strong>{' '}
              {companyInfo.address}, България
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
