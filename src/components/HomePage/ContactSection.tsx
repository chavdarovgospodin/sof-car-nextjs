'use client';

import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { Phone, Email, LocationOn, Business } from '@mui/icons-material';
import { ContactForm } from './ContactForm';
import Link from 'next/link';

interface ContactSectionProps {
  currentLang: string;
  onShowSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

export function ContactSection({
  currentLang,
  onShowSnackbar,
}: ContactSectionProps) {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'grey.50' }}>
      {/* Call to Action Header */}
      <Box sx={{ py: { xs: 6, md: 4 }, color: 'primary.light' }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            {currentLang === 'bg'
              ? 'Обадете ни се за наличности и цени или направете запитване в нашата контактна форма по-долу'
              : 'Call us for availability and prices or make an inquiry in our contact form below'}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Google Maps */}
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              width: '100%',
              height: 450,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <iframe
              title="SofCar Location in Yambol"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26114.18985576526!2d26.506186044907285!3d42.49307908419431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a63435db7821ef%3A0x789eff0b31da8b94!2sauto%20service%20AVTOTSENTAR!5e0!3m2!1sen!2sbg!4v1689711472346!5m2!1sen!2sbg"
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
          sx={{ mb: 6 }}
        >
          {currentLang === 'bg' ? 'Контакти' : 'Contact'}
        </Typography>

        <Grid container spacing={6}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3 }}>
              {currentLang === 'bg' ? 'Направете запитване' : 'Make an Inquiry'}
            </Typography>
            <ContactForm
              currentLang={currentLang}
              onShowSnackbar={onShowSnackbar}
            />
          </Grid>

          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ mb: 3 }}>
              {currentLang === 'bg'
                ? 'Информация за контакт'
                : 'Contact Information'}
            </Typography>

            <Paper
              sx={{
                p: 3,
                backgroundColor: 'white',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
              >
                <Phone sx={{ color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {currentLang === 'bg' ? 'Телефон' : 'Phone'}
                  </Typography>
                  <Typography variant="body1">
                    <Link href="tel:+359879994212" color="inherit">
                      +359 87 999 4212
                    </Link>
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
              >
                <Email sx={{ color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    <Link href="mailto:2013anikar@gmail.com" color="inherit">
                      2013anikar@gmail.com
                    </Link>
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
              >
                <LocationOn sx={{ color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {currentLang === 'bg' ? 'Адрес' : 'Address'}
                  </Typography>
                  <Typography variant="body1">
                    Западна промишлена зона, Ямбол, 8600
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
              >
                <Business sx={{ color: 'primary.main' }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {currentLang === 'bg' ? 'Работно време' : 'Business Hours'}
                  </Typography>
                  <Typography variant="body1">
                    {currentLang === 'bg'
                      ? 'Понеделник - Петък: 8:00 - 18:00'
                      : 'Monday - Friday: 8:00 AM - 6:00 PM'}
                  </Typography>
                  <Typography variant="body1">
                    {currentLang === 'bg'
                      ? 'Събота: 9:00 - 16:00'
                      : 'Saturday: 9:00 AM - 4:00 PM'}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
