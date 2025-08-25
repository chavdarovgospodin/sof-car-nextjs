'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { Send } from '@mui/icons-material';

interface ContactFormProps {
  currentLang: string;
  onShowSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export function ContactForm({ currentLang, onShowSnackbar }: ContactFormProps) {
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      onShowSnackbar(
        currentLang === 'bg'
          ? 'Моля, попълнете всички задължителни полета'
          : 'Please fill in all required fields',
        'error'
      );
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      onShowSnackbar(
        currentLang === 'bg'
          ? 'Моля, въведете валиден email адрес'
          : 'Please enter a valid email address',
        'error'
      );
      return;
    }

    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    onShowSnackbar(
      currentLang === 'bg'
        ? 'Съобщението е изпратено успешно!'
        : 'Message sent successfully!',
      'success'
    );

    // Reset form
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{
          textAlign: 'center',
          marginBottom: 3,
          color: '#1976d2',
          fontWeight: 'bold',
        }}
      >
        {currentLang === 'bg' ? 'Свържете се с нас' : 'Contact Us'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label={currentLang === 'bg' ? 'Име *' : 'Name *'}
              value={contactForm.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 1.5,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="email"
              label={currentLang === 'bg' ? 'Email *' : 'Email *'}
              value={contactForm.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 1.5,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label={currentLang === 'bg' ? 'Телефон' : 'Phone'}
              value={contactForm.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 1.5,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label={currentLang === 'bg' ? 'Съобщение *' : 'Message *'}
              value={contactForm.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              required
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 1.5,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<Send />}
              sx={{
                backgroundColor: '#4caf50',
                '&:hover': {
                  backgroundColor: '#45a049',
                },
                height: 48,
                fontWeight: 'bold',
                fontSize: '1.1rem',
              }}
            >
              {currentLang === 'bg' ? 'Изпрати' : 'Send'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
