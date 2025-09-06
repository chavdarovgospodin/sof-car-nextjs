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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { CarData } from '../../types/api';

interface BookingData {
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientPhone: string;
  paymentMethod: string;
  termsAccepted: boolean;
}
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  CreditCard,
  Security,
  CarRental,
  CalendarToday,
  Euro,
} from '@mui/icons-material';
import { TermsConditionsDialog } from './TermsConditionsDialog';

interface BookingFormProps {
  car: CarData;
  searchDates: {
    start: Date | null;
    end: Date | null;
  };
  onSubmit: (formData: {
    clientFirstName: string;
    clientLastName: string;
    clientPhone: string;
    clientEmail: string;
    paymentMethod: string;
  }) => Promise<void>;
  isLoading: boolean;
  t: (key: string, values?: Record<string, unknown>) => string;
  open: boolean;
  onClose: () => void;
  lang: string;
}

export function BookingForm({
  car,
  searchDates,
  onSubmit,
  isLoading,
  t,
  open,
  onClose,
  lang,
}: BookingFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Partial<BookingData>>({
    resolver: joiResolver(
      Joi.object({
        clientFirstName: Joi.string()
          .min(2)
          .max(20)
          .required()
          .messages({
            'string.min': t('booking.clientFirstNameMin'),
            'string.max': t('booking.clientFirstNameMax'),
            'string.empty': t('booking.clientFirstNameRequired'),
          }),
        clientLastName: Joi.string()
          .min(2)
          .max(20)
          .required()
          .messages({
            'string.min': t('booking.clientLastNameMin'),
            'string.max': t('booking.clientLastNameMax'),
            'string.empty': t('booking.clientLastNameRequired'),
          }),
        clientEmail: Joi.string()
          .email()
          .required()
          .messages({
            'string.email': t('booking.clientEmailInvalid'),
            'string.empty': t('booking.clientEmailRequired'),
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
            'string.empty': t('booking.clientPhoneRequired'),
          }),
        termsAccepted: Joi.boolean()
          .valid(true)
          .required()
          .messages({
            'any.only': t('booking.termsRequired'),
            'any.required': t('booking.termsRequired'),
          }),
      })
    ),
    defaultValues: {
      clientFirstName: '',
      clientLastName: '',
      clientEmail: '',
      clientPhone: '',
      termsAccepted: false,
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
    return days * car.price_per_day;
  };

  const totalDays = calculateTotalDays();
  const totalPrice = calculateTotalPrice();

  const handleFormSubmit = async (data: Partial<BookingData>) => {
    try {
      await onSubmit({
        clientFirstName: data.clientFirstName || '',
        clientLastName: data.clientLastName || '',
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isMobile ? false : 'md'}
      fullWidth
      fullScreen={isMobile}
      disableScrollLock={true}
      keepMounted={false}
      sx={{
        '& .MuiDialog-paper': {
          margin: isMobile ? 0 : 2,
          maxHeight: isMobile ? '100vh' : 'calc(100vh - 32px)',
          borderRadius: isMobile ? 0 : undefined,
        },
      }}
    >
      <DialogTitle>
        {t('booking.title')} {car.brand} {car.model}
      </DialogTitle>
      <DialogContent sx={{ p: isMobile ? '16px 8px' : '20px 24px' }}>
        <Box sx={{ mt: 2 }}>
          {/* Car Details Section - Better Presentation */}
          <Paper sx={{ p: isMobile ? 1 : 3, mb: 3 }}>
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
                    {car.price_per_day.toFixed(2)} €{' '}
                    {t('booking.bookingPerDay')}
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

            {/* Deposit Information */}
            <Box
              sx={{
                marginBottom: 2,
                padding: 2,
                backgroundColor: '#fff3e0',
                borderRadius: 2,
                border: '1px solid #ffb74d',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#e65100',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  marginBottom: 1,
                }}
              >
                <Security sx={{ fontSize: 20 }} />
                {t('booking.depositRequired')}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#e65100',
                  marginBottom: 1,
                }}
              >
                {(car.deposit_amount * 1.96).toFixed(0)} лв / ≈
                {car.deposit_amount.toFixed(2)} €
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.875rem' }}
              >
                {t('booking.depositInfo')}
              </Typography>
            </Box>

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
                    name="clientFirstName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={t('booking.clientFirstName')}
                        placeholder={t('booking.clientFirstNamePlaceholder')}
                        error={!!errors.clientFirstName}
                        helperText={errors.clientFirstName?.message}
                        required
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="clientLastName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={t('booking.clientLastName')}
                        placeholder={t('booking.clientLastNamePlaceholder')}
                        error={!!errors.clientLastName}
                        helperText={errors.clientLastName?.message}
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

                <Grid size={{ xs: 12, sm: 6 }}>
                  <Controller
                    name="clientPhone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label={t('booking.clientPhone')}
                        placeholder={'+359 88 888 888'}
                        error={!!errors.clientPhone}
                        helperText={errors.clientPhone?.message}
                        required
                      />
                    )}
                  />
                </Grid>
              </Grid>

              {/* Terms and Conditions Checkbox */}
              <Box sx={{ mb: 3 }}>
                <Controller
                  name="termsAccepted"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.checked);
                            setTermsAccepted(e.target.checked);
                          }}
                          style={{ marginRight: 8 }}
                        />
                      }
                      label={
                        <Typography variant="body2">
                          {lang === 'en'
                            ? 'I confirm that I am familiar with and agree to the '
                            : 'Потвърждавам, че съм запознат и съм съгласен с '}
                          <Button
                            variant="text"
                            color="primary"
                            size="small"
                            onClick={() => setTermsDialogOpen(true)}
                            sx={{
                              p: 0,
                              minWidth: 'auto',
                              textTransform: 'none',
                              textDecoration: 'underline',
                              fontSize: 'inherit',
                              fontWeight: 'inherit',
                            }}
                          >
                            {lang === 'en'
                              ? 'General Terms and Conditions'
                              : 'Общите условия'}
                          </Button>
                        </Typography>
                      }
                    />
                  )}
                />
                {errors.termsAccepted && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 1, display: 'block' }}
                  >
                    {errors.termsAccepted.message}
                  </Typography>
                )}
              </Box>

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
                    value="card"
                    checked
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
                </RadioGroup>
              </FormControl>

              {/* Payment Method Details */}
              {paymentMethod === 'card' && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    {t('booking.creditCardInfo')}
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
            </form>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: isMobile ? 'center' : 'right' }}>
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

      {/* Terms and Conditions Dialog */}
      <TermsConditionsDialog
        open={termsDialogOpen}
        onClose={() => setTermsDialogOpen(false)}
        lang={lang}
      />
    </Dialog>
  );
}
