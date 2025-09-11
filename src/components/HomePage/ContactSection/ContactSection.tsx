'use client';

import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { ContactForm } from '../ContactForm';
import { ContactSectionProps } from './ContactSection.types';
import { styles } from './ContactSection.styles';
import { getContactTexts, getContactInfo } from './ContactSection.const';
import Link from 'next/link';

export function ContactSection({
  currentLang,
  onShowSnackbar,
}: ContactSectionProps) {
  const texts = getContactTexts(currentLang);
  const contactInfo = getContactInfo(currentLang);

  return (
    <Box id="contact" sx={styles.section}>
      {/* Call to Action Header */}
      <Box sx={styles.ctaHeader}>
        <Container maxWidth="lg" sx={styles.ctaTitle}>
          <Typography variant="h4" component="h2" gutterBottom>
            {texts.ctaTitle}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Google Maps */}
        <Box sx={styles.mapContainer}>
          <Box sx={styles.map}>
            <iframe
              title="SofCar Location in Yambol"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.7291506991833!2d26.4990608!3d42.4944651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a635b9e4e74ffd%3A0x6468c381ace92082!2zU29mIENhciBSZW50YWwgLyDQmtC-0LvQuCDQv9C-0LQg0L3QsNC10Lwg0K_QvNCx0L7QuyAvIFlhbWJvbA!5e1!3m2!1sen!2sbg!4v1757248567924!5m2!1sen!2sbg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
        </Box>

        {/* Contact Form and Information */}
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={styles.contactTitle}
        >
          {texts.contactTitle}
        </Typography>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={styles.contactFormTitle}
            >
              {texts.formTitle}
            </Typography>
            <Paper sx={styles.paperContainer}>
              <ContactForm
                currentLang={currentLang}
                onShowSnackbar={onShowSnackbar}
              />
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={styles.contactInfoTitle}
            >
              {texts.infoTitle}
            </Typography>

            <Paper sx={styles.paperContainer}>
              {contactInfo.map((info, index) => (
                <Box key={index} sx={styles.contactItem}>
                  {info.icon}
                  <Box>
                    <Typography variant="body2" sx={styles.contactLabel}>
                      {info.label}
                    </Typography>
                    {info.link ? (
                      <Typography variant="body1">
                        <Link
                          href={info.link}
                          color="inherit"
                          style={{ textDecoration: 'none' }}
                        >
                          {info.value}
                        </Link>
                      </Typography>
                    ) : (
                      <Typography variant="body1">
                        {info.value.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < info.value.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ContactSection;
