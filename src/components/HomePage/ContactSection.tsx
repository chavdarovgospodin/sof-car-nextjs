'use client';

import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { Phone, Email, LocationOn, Business } from '@mui/icons-material';
import { ContactForm } from './ContactForm';
import { APP_CONFIG } from '../../utils/constants';
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
    <Box id="contact" sx={{ py: { xs: 2, md: 4 }, backgroundColor: 'grey.50' }}>
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
                    <Link
                      href="tel:+359879994212"
                      color="inherit"
                      style={{ textDecoration: 'none' }}
                    >
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
                    <Link
                      href={`mailto:${APP_CONFIG.email}`}
                      color="inherit"
                      style={{ textDecoration: 'none' }}
                    >
                      {APP_CONFIG.email}
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
                    {currentLang === 'bg'
                      ? 'Западна промишлена зона, ул. "Ямболен" 18, 8601 Ямбол'
                      : APP_CONFIG.address}
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
