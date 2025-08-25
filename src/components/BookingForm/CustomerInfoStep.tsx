'use client';

import { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslations } from '@/hooks/useTranslations';
import { BookingData, bookingSchema } from '@/utils/validation';
import Joi from 'joi';

interface CustomerInfoStepProps {
  data?: Partial<BookingData>;
  onComplete: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

export function CustomerInfoStep({
  data,
  onComplete,
  onNext,
}: CustomerInfoStepProps) {
  const { t, currentLang } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Partial<BookingData>>({
    resolver: joiResolver(
      Joi.object({
        customerName: Joi.string().min(2).max(100).required().messages({
          'string.min': 'Името трябва да е поне 2 символа',
          'string.max': 'Името не може да е повече от 100 символа',
          'any.required': 'Името е задължително',
        }),
        email: Joi.string().email().required().messages({
          'string.email': 'Невалиден имейл адрес',
          'any.required': 'Имейлът е задължителен',
        }),
        phone: Joi.string()
          .pattern(/^[0-9+\-\s()]+$/)
          .min(10)
          .max(15)
          .required()
          .messages({
            'string.pattern.base': 'Невалиден телефонен номер',
            'string.min': 'Телефонният номер трябва да е поне 10 символа',
            'string.max': 'Телефонният номер не може да е повече от 15 символа',
            'any.required': 'Телефонният номер е задължителен',
          }),
      })
    ),
    defaultValues: {
      customerName: data?.customerName || '',
      email: data?.email || '',
      phone: data?.phone || '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (formData: Partial<BookingData>) => {
    setIsSubmitting(true);
    try {
      onComplete(formData);
    } catch (error) {
      console.error('Error saving customer info:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        {currentLang === 'bg' ? 'Информация за клиент' : 'Customer Information'}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {currentLang === 'bg'
          ? 'Моля, попълнете вашите лични данни'
          : 'Please fill in your personal information'}
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Customer Name */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="customerName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={currentLang === 'bg' ? 'Пълно име' : 'Full Name'}
                  placeholder={
                    currentLang === 'bg'
                      ? 'Въведете вашето име'
                      : 'Enter your full name'
                  }
                  error={!!errors.customerName}
                  helperText={errors.customerName?.message}
                  required
                />
              )}
            />
          </Grid>

          {/* Email */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="email"
                  label="Email"
                  placeholder={
                    currentLang === 'bg' ? 'your@email.com' : 'your@email.com'
                  }
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  required
                />
              )}
            />
          </Grid>

          {/* Phone */}
          <Grid size={{ xs: 12 }}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label={
                    currentLang === 'bg' ? 'Телефонен номер' : 'Phone Number'
                  }
                  placeholder={
                    currentLang === 'bg'
                      ? '+359 87 999 4212'
                      : '+359 87 999 4212'
                  }
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  required
                />
              )}
            />
          </Grid>

          {/* Submit Button */}
          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!isValid || isSubmitting}
                sx={{ minWidth: 120 }}
              >
                {isSubmitting
                  ? currentLang === 'bg'
                    ? 'Зареждане...'
                    : 'Loading...'
                  : currentLang === 'bg'
                  ? 'Продължи'
                  : 'Continue'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      {/* Info Alert */}
      <Alert severity="info" sx={{ mt: 3 }}>
        {currentLang === 'bg'
          ? 'Вашите данни ще бъдат използвани само за резервацията и няма да бъдат споделяни с трети страни.'
          : 'Your data will only be used for the booking and will not be shared with third parties.'}
      </Alert>
    </Box>
  );
}
