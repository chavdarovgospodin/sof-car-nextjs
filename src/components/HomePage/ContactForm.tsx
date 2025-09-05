'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Send } from '@mui/icons-material';
import { useContactEmail, ContactFormData } from '@/hooks/useContactEmail';
import { validateContactForm, ValidationError } from '@/utils/validation';

interface ContactFormProps {
  currentLang: string;
  onShowSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

export function ContactForm({ currentLang, onShowSnackbar }: ContactFormProps) {
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const { sendContactEmail, isLoading } = useContactEmail();

  const getFieldError = (field: string): string | null => {
    const error = validationErrors.find((err) => err.field === field);
    return error ? error.message : null;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors.some((err) => err.field === field)) {
      setValidationErrors((prev) => prev.filter((err) => err.field !== field));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous validation errors
    setValidationErrors([]);

    // Validate form data
    const validation = validateContactForm(contactForm);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      onShowSnackbar(
        currentLang === 'bg'
          ? 'Моля, поправете грешките във формата'
          : 'Please fix the form errors',
        'error'
      );
      return;
    }

    try {
      const result = await sendContactEmail(contactForm);

      if (result.success) {
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
        setValidationErrors([]);
      } else {
        onShowSnackbar(
          result.message ||
            (currentLang === 'bg'
              ? 'Възникна грешка при изпращане на съобщението'
              : 'An error occurred while sending the message'),
          'error'
        );
      }
    } catch (error) {
      console.error('Contact form error:', error);
      onShowSnackbar(
        currentLang === 'bg'
          ? 'Възникна грешка при изпращане на съобщението'
          : 'An error occurred while sending the message',
        'error'
      );
    }
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
              error={!!getFieldError('name')}
              helperText={getFieldError('name')}
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
              error={!!getFieldError('email')}
              helperText={getFieldError('email')}
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
              error={!!getFieldError('phone')}
              helperText={getFieldError('phone')}
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
              error={!!getFieldError('message')}
              helperText={getFieldError('message')}
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
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Send />
                )
              }
              sx={{
                backgroundColor: '#4caf50',
                '&:hover': {
                  backgroundColor: '#45a049',
                },
                '&:disabled': {
                  backgroundColor: '#cccccc',
                },
                height: 48,
                fontWeight: 'bold',
                fontSize: '1.1rem',
              }}
            >
              {isLoading
                ? currentLang === 'bg'
                  ? 'Изпращане...'
                  : 'Sending...'
                : currentLang === 'bg'
                ? 'Изпрати'
                : 'Send'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
