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
import { Controller, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  CreditCard,
  Security,
  CarRental,
  CalendarToday,
  CheckCircle,
} from '@mui/icons-material';
import { TermsConditionsDialog } from './TermsConditionsDialog/TermsConditionsDialog';
import { BookingFormProps, BookingData } from './BookingForm.types';
import { styles } from './BookingForm.styles';
import {
  createValidationSchema,
  calculateTotalDays,
  calculateTotalPrice,
  getDefaultValues,
} from './BookingForm.const';

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
  const [paymentMethod, setPaymentMethod] = useState<string>('vpos');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Partial<BookingData>>({
    resolver: joiResolver(createValidationSchema(t)),
    defaultValues: getDefaultValues(),
    mode: 'onChange',
  });

  const totalDays = calculateTotalDays(searchDates);
  const totalPrice = calculateTotalPrice(car, searchDates);

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
        ...styles.dialog,
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
      <DialogContent sx={isMobile ? styles.dialogContent : { p: '20px 24px' }}>
        <Box sx={{ mt: 2 }}>
          {/* Car Details Section - Better Presentation */}
          <Paper sx={isMobile ? styles.carDetailsPaper : { p: 3, mb: 3 }}>
            <Typography variant="h5" sx={styles.carDetailsTitle}>
              <CarRental />
              {t('booking.carDetails')}
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={styles.carInfoContainer}>
                  <Chip
                    label={`${car.brand} ${car.model}`}
                    color="primary"
                    variant="outlined"
                    sx={styles.carChip}
                  />
                  <Chip
                    label={car.class}
                    color="secondary"
                    variant="outlined"
                  />
                </Box>

                {/* Car Year Display */}
                <Box sx={styles.yearContainer}>
                  <Typography variant="body1" color="text.secondary">
                    <strong>{t('booking.year')}:</strong> {car.year}
                  </Typography>
                </Box>

                <Box sx={styles.priceContainer}>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={styles.priceText}
                  >
                    {car.price_per_day.toFixed(0)} лв / ≈
                    {(car.price_per_day / 1.96).toFixed(2)} €{' '}
                    {t('booking.bookingPerDay')}
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={styles.daysContainer}>
                  <CalendarToday color="action" />
                  <Typography variant="h6" color="text.secondary">
                    {totalDays} {t('booking.bookingDays')}
                  </Typography>
                </Box>

                <Typography variant="h4" color="primary" sx={styles.totalPrice}>
                  {(totalPrice * 1.96).toFixed(0)} лв
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ≈{totalPrice.toFixed(2)} € / {t('booking.totalPrice')}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={styles.divider} />

            {/* Car Features */}
            {car.features && car.features.length > 0 && (
              <Box sx={styles.featuresContainer}>
                <Typography variant="h6" sx={styles.featuresTitle}>
                  <CheckCircle sx={{ fontSize: 20 }} />
                  {t('booking.carFeatures')}
                </Typography>
                <Box sx={styles.featuresChips}>
                  {car.features.map((feature, index) => (
                    <Chip
                      key={index}
                      label={feature}
                      variant="outlined"
                      color="primary"
                      size="small"
                      sx={styles.featureChip}
                    />
                  ))}
                </Box>
              </Box>
            )}

            <Divider sx={styles.divider} />

            {/* Deposit Information */}
            <Box sx={styles.depositContainer}>
              <Typography variant="h6" sx={styles.depositTitle}>
                <Security sx={{ fontSize: 20 }} />
                {t('booking.depositRequired')}
              </Typography>
              <Typography variant="h5" sx={styles.depositAmount}>
                {car.deposit_amount.toFixed(0)} лв / ≈
                {(car.deposit_amount / 1.96).toFixed(2)} €
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={styles.depositInfo}
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
          <Paper sx={styles.clientInfoPaper}>
            <Typography variant="h5" sx={styles.clientInfoTitle}>
              {t('booking.clientInformation')}
            </Typography>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Grid container spacing={3} sx={styles.formGrid}>
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
              <Box sx={styles.termsContainer}>
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
                            sx={styles.termsButton}
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
                    sx={styles.termsError}
                  >
                    {errors.termsAccepted.message}
                  </Typography>
                )}
              </Box>

              {/* Payment Methods - Now Functional */}
              <Typography variant="h6" gutterBottom sx={styles.paymentTitle}>
                {t('booking.paymentMethods')}
              </Typography>

              <FormControl component="fieldset" sx={styles.paymentFormControl}>
                <FormLabel component="legend" sx={styles.paymentLabel}>
                  {t('booking.selectPaymentMethod')}
                </FormLabel>
                <RadioGroup
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  sx={styles.radioGroup}
                >
                  <FormControlLabel
                    value="vpos"
                    checked
                    control={<Radio />}
                    label={
                      <Box sx={styles.paymentOption}>
                        <CreditCard color="primary" />
                        <Typography variant="subtitle1">
                          {t('booking.payment')}
                        </Typography>
                        <Typography variant="subtitle2">
                          ({t('booking.paymentDescription')})
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </FormControl>

              {/* Payment Method Details */}
              {paymentMethod === 'vpos' && (
                <Alert severity="info" sx={styles.alert}>
                  <Typography variant="body2">
                    {t('booking.creditCardInfo')}
                  </Typography>
                </Alert>
              )}

              {/* Security and Data Protection Info */}
              <Alert severity="info" sx={styles.alert}>
                <Box sx={styles.securityAlert}>
                  <Security />
                  <Typography>{t('booking.securityInfo')}</Typography>
                </Box>
              </Alert>

              {/* Final Information */}
              <Alert severity="success" sx={styles.alert}>
                <Typography variant="body2">
                  {t('booking.finalInfo')}
                </Typography>
              </Alert>
            </form>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions
        sx={isMobile ? styles.dialogActions : { justifyContent: 'right' }}
      >
        <Button onClick={onClose} color="error" variant="outlined">
          {t('booking.bookingCancel')}
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          variant="contained"
          disabled={!isValid || isLoading}
          sx={styles.confirmButton}
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
