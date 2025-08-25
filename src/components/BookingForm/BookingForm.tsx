'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import { CarData } from '../../services/googleSheets';

interface BookingFormProps {
  car: CarData;
  searchDates: {
    start: Date | null;
    end: Date | null;
  };
  onSubmit: (formData: {
    clientName: string;
    clientPhone: string;
    clientEmail: string;
  }) => Promise<void>;
  isLoading: boolean;
  t: (key: string, values?: Record<string, unknown>) => string;
}

export function BookingForm({
  car,
  searchDates,
  onSubmit,
  isLoading,
  t,
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = t('booking.clientNameRequired');
    }

    if (!formData.clientPhone.trim()) {
      newErrors.clientPhone = t('booking.clientPhoneRequired');
    }

    if (!formData.clientEmail.trim()) {
      newErrors.clientEmail = t('booking.clientEmailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
      newErrors.clientEmail = t('booking.clientEmailInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const calculateTotalDays = () => {
    if (!searchDates.start || !searchDates.end) return 0;
    const diffTime = Math.abs(
      searchDates.end.getTime() - searchDates.start.getTime()
    );
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    const days = calculateTotalDays();
    return days * car.price;
  };

  const totalDays = calculateTotalDays();
  const totalPrice = calculateTotalPrice();

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
          {t('booking.carDetails')}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              {t('booking.car')}: {car.make} {car.model}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              {t('booking.class')}: {car.class}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              {t('booking.pricePerDay')}: {car.price.toFixed(2)} €
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              {t('booking.totalDays')}: {totalDays}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {t('booking.totalPrice')}: {totalPrice.toFixed(2)} €
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
          {t('booking.clientInformation')}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label={t('booking.clientName')}
              value={formData.clientName}
              onChange={(e) => handleInputChange('clientName', e.target.value)}
              error={!!errors.clientName}
              helperText={errors.clientName}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label={t('booking.clientPhone')}
              value={formData.clientPhone}
              onChange={(e) => handleInputChange('clientPhone', e.target.value)}
              error={!!errors.clientPhone}
              helperText={errors.clientPhone}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label={t('booking.clientEmail')}
              type="email"
              value={formData.clientEmail}
              onChange={(e) => handleInputChange('clientEmail', e.target.value)}
              error={!!errors.clientEmail}
              required
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
          {t('booking.rentalPeriod')}
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              {t('booking.startDate')}:{' '}
              {searchDates.start?.toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              {t('booking.endDate')}: {searchDates.end?.toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t('booking.confirmBooking')
          )}
        </Button>
      </Box>

      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {t('booking.pleaseFixErrors')}
        </Alert>
      )}
    </Box>
  );
}
