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
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
// TODO: Replace with actual backend types when implemented
interface CarData {
  id: string;
  brand: string;
  model: string;
  year: number;
  class: string;
  price: number;
  imageUrl?: string;
  available: boolean;
  features: string[];
}

interface BookingData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  paymentMethod: string;
}
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  CreditCard,
  Payment,
  Security,
  CarRental,
  CalendarToday,
  Euro,
} from '@mui/icons-material';

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
    paymentMethod: string;
  }) => Promise<void>;
  isLoading: boolean;
  t: (key: string, values?: Record<string, unknown>) => string;
  open: boolean;
  onClose: () => void;
}

export function BookingForm({
  car,
  searchDates,
  onSubmit,
  isLoading,
  t,
  open,
  onClose,
}: BookingFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('creditCard');

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Partial<BookingData>>({
    resolver: joiResolver(
      Joi.object({
        clientName: Joi.string()
          .min(2)
          .max(100)
          .required()
          .messages({
            'string.min': t('booking.clientNameMin'),
            'string.max': t('booking.clientNameMax'),
            'any.required': t('booking.clientNameRequired'),
          }),
        clientEmail: Joi.string()
          .email()
          .required()
          .messages({
            'string.email': t('booking.clientEmailInvalid'),
            'any.required': t('booking.clientEmailRequired'),
          }),
        clientPhone: Joi.string()
          .pattern(/^[0-9+\-\s()]+$/)
          .min(10)
          .max(15)
          .required()
          .messages({
            'string.pattern.base': t('booking.clientPhoneInvalid'),
            'string.min': t('booking.clientPhoneMin'),
            'string.max': t('booking.clientPhoneMax'),
            'any.required': t('booking.clientPhoneRequired'),
          }),
      })
    ),
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientPhone: '',
    },
    mode: 'onChange',
  });

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

  const handleFormSubmit = async (data: Partial<BookingData>) => {
    try {
      await onSubmit({
        clientName: data.clientName || '',
        clientPhone: data.clientPhone || '',
        clientEmail: data.clientEmail || '',
        paymentMethod: paymentMethod,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {t('booking.title')} {car.brand} {car.model}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Car Details Section - Better Presentation */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                color: '#1976d2',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <CarRental />
              {t('booking.carDetails')}
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
                >
                  <Chip
                    label={`${car.brand} ${car.model}`}
                    color="primary"
                    variant="outlined"
                    sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
                  />
                  <Chip
                    label={car.class}
                    color="secondary"
                    variant="outlined"
                  />
                </Box>

                {/* Car Year Display */}
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}
                >
                  <Typography variant="body1" color="text.secondary">
                    <strong>{t('booking.year')}:</strong> {car.year}
                  </Typography>
                </Box>

                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
                >
                  <Euro color="primary" />
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {car.price.toFixed(2)} € {t('booking.bookingPerDay')}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
                >
                  <CalendarToday color="action" />
                  <Typography variant="h6" color="text.secondary">
                    {totalDays} {t('booking.bookingDays')}
                  </Typography>
                </Box>

                <Typography
                  variant="h4"
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                >
                  {totalPrice.toFixed(2)} €
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t('booking.totalPrice')}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>{t('booking.startDate')}:</strong>{' '}
                  {searchDates.start?.toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>{t('booking.endDate')}:</strong>{' '}
                  {searchDates.end?.toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Client Information + Payment Methods Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" sx={{ mb: 3, color: '#1976d2' }}>
              {t('booking.clientInformation')}
            </Typography>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="clientName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={t('booking.clientName')}
                        placeholder={t('booking.clientNamePlaceholder')}
                        error={!!errors.clientName}
                        helperText={errors.clientName?.message}
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="clientEmail"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="email"
                        label={t('booking.clientEmail')}
                        placeholder={'your@email.com'}
                        error={!!errors.clientEmail}
                        helperText={errors.clientEmail?.message}
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="clientPhone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={t('booking.clientPhone')}
                        placeholder={'+359 87 999 4212'}
                        error={!!errors.clientPhone}
                        helperText={errors.clientPhone?.message}
                        required
                      />
                    )}
                  />
                </Grid>
              </Grid>

              {/* Payment Methods - Now Functional */}
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                {t('booking.paymentMethods')}
              </Typography>

              <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend" sx={{ mb: 2 }}>
                  {t('booking.selectPaymentMethod')}
                </FormLabel>
                <RadioGroup
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  sx={{ flexDirection: 'row', gap: 2 }}
                >
                  <FormControlLabel
                    value="creditCard"
                    control={<Radio />}
                    label={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <CreditCard color="primary" />
                        <Typography variant="subtitle1">
                          {t('booking.creditCard')}
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    value="cashOnDelivery"
                    control={<Radio />}
                    label={
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                      >
                        <Payment color="action" />
                        <Typography variant="subtitle1">
                          {t('booking.cashOnDelivery')}
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>

              {/* Payment Method Details */}
              {paymentMethod === 'creditCard' && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    {t('booking.creditCardInfo')}
                  </Typography>
                </Alert>
              )}

              {paymentMethod === 'cashOnDelivery' && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    {t('booking.cashOnDeliveryInfo')}
                  </Typography>
                </Alert>
              )}

              {/* Security and Data Protection Info */}
              <Alert severity="info" sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Security />
                  <Typography>{t('booking.securityInfo')}</Typography>
                </Box>
              </Alert>

              {/* Final Information */}
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  {t('booking.finalInfo')}
                </Typography>
              </Alert>

              {/* Error Display */}
              {Object.keys(errors).length > 0 && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {t('booking.pleaseFixErrors')}
                </Alert>
              )}
            </form>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          {t('booking.bookingCancel')}
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          variant="contained"
          disabled={!isValid || isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            t('booking.confirmBooking')
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
