'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  Chip,
  Paper,
} from '@mui/material';
import { CalendarToday, AccessTime, Calculate } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslations } from '@/hooks/useTranslations';
import { BookingData, bookingSchema } from '@/utils/validation';
import { CAR_CLASSES } from '@/utils/constants';
import {
  getDaysDifference,
  getMinDate,
  getMaxDate,
  isValidDateRange,
} from '@/utils/dateUtils';
import Joi from 'joi';

interface RentalDetailsStepProps {
  data?: Partial<BookingData>;
  onComplete: (data: Partial<BookingData>) => void;
  onBack: () => void;
  onNext: () => void;
}

export function RentalDetailsStep({
  data,
  onComplete,
  onBack,
  onNext,
}: RentalDetailsStepProps) {
  const { t, currentLang } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Partial<BookingData>>({
    resolver: joiResolver(
      Joi.object({
        startDate: Joi.date().min('now').required().messages({
          'date.min': 'Началната дата не може да е в миналото',
          'any.required': 'Началната дата е задължителна',
        }),
        endDate: Joi.date().min(Joi.ref('startDate')).required().messages({
          'date.min': 'Крайната дата трябва да е след началната',
          'any.required': 'Крайната дата е задължителна',
        }),
      })
    ),
    defaultValues: {
      startDate: data?.startDate || getMinDate(),
      endDate: data?.endDate || '',
    },
    mode: 'onChange',
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const selectedCarClass = data?.carClass;

  // Calculate total price when dates change
  useEffect(() => {
    if (startDate && endDate && selectedCarClass) {
      const days = getDaysDifference(startDate, endDate);
      const dailyPrice = parseFloat(
        CAR_CLASSES[selectedCarClass as keyof typeof CAR_CLASSES].price[
          currentLang as 'bg' | 'en'
        ]
      );
      setTotalPrice(days * dailyPrice);
    }
  }, [startDate, endDate, selectedCarClass, currentLang]);

  const onSubmit = async (formData: Partial<BookingData>) => {
    setIsSubmitting(true);
    try {
      onComplete(formData);
    } catch (error) {
      console.error('Error saving rental details:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDateRangeValid =
    startDate && endDate && isValidDateRange(startDate, endDate);

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        {currentLang === 'bg' ? 'Детайли за наема' : 'Rental Details'}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {currentLang === 'bg'
          ? 'Изберете начална и крайна дата за вашия наем'
          : 'Choose start and end dates for your rental'}
      </Typography>

      {/* Selected Car Summary */}
      {selectedCarClass && (
        <Paper sx={{ p: 2, mb: 3, backgroundColor: 'primary.light' }}>
          <Typography variant="h6" gutterBottom>
            {currentLang === 'bg' ? 'Избран автомобил:' : 'Selected Car:'}
          </Typography>
          <Typography variant="body1">
            {
              CAR_CLASSES[selectedCarClass as keyof typeof CAR_CLASSES]
                .displayName[currentLang as 'bg' | 'en']
            }{' '}
            -
            {
              CAR_CLASSES[selectedCarClass as keyof typeof CAR_CLASSES].price[
                currentLang as 'bg' | 'en'
              ]
            }
            {CAR_CLASSES[selectedCarClass as keyof typeof CAR_CLASSES].currency}
            /{currentLang === 'bg' ? 'ден' : 'day'}
          </Typography>
        </Paper>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          {/* Start Date */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  label={currentLang === 'bg' ? 'Начална дата' : 'Start Date'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: getMinDate(),
                    max: getMaxDate(),
                  }}
                  error={!!errors.startDate}
                  helperText={errors.startDate?.message}
                  required
                  InputProps={{
                    startAdornment: (
                      <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* End Date */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="date"
                  label={currentLang === 'bg' ? 'Крайна дата' : 'End Date'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: startDate || getMinDate(),
                    max: getMaxDate(),
                  }}
                  error={!!errors.endDate}
                  helperText={errors.endDate?.message}
                  required
                  InputProps={{
                    startAdornment: (
                      <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                    ),
                  }}
                />
              )}
            />
          </Grid>

          {/* Date Range Validation */}
          {startDate && endDate && !isDateRangeValid && (
            <Grid size={{ xs: 12 }}>
              <Alert severity="error">
                {currentLang === 'bg'
                  ? 'Крайната дата трябва да е след началната дата'
                  : 'End date must be after start date'}
              </Alert>
            </Grid>
          )}

          {/* Rental Summary */}
          {isDateRangeValid && selectedCarClass && (
            <Grid size={{ xs: 12 }}>
              <Paper sx={{ p: 3, backgroundColor: 'grey.50' }}>
                <Typography variant="h6" gutterBottom>
                  {currentLang === 'bg'
                    ? 'Обобщение на резервацията:'
                    : 'Booking Summary:'}
                </Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTime color="primary" />
                      <Typography>
                        {currentLang === 'bg'
                          ? 'Продължителност:'
                          : 'Duration:'}{' '}
                        <strong>
                          {getDaysDifference(startDate, endDate)}{' '}
                          {currentLang === 'bg' ? 'дни' : 'days'}
                        </strong>
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Calculate color="primary" />
                      <Typography>
                        {currentLang === 'bg' ? 'Обща цена:' : 'Total Price:'}{' '}
                        <strong>
                          {totalPrice.toFixed(2)}{' '}
                          {
                            CAR_CLASSES[
                              selectedCarClass as keyof typeof CAR_CLASSES
                            ].currency
                          }
                        </strong>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}

          {/* Navigation Buttons */}
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}
            >
              <Button
                variant="outlined"
                onClick={onBack}
                size="large"
                sx={{ minWidth: 120 }}
              >
                {currentLang === 'bg' ? 'Назад' : 'Back'}
              </Button>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!isValid || isSubmitting || !isDateRangeValid}
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
          ? 'Минималният период за наем е 1 ден. Можете да резервирате до 1 година напред.'
          : 'Minimum rental period is 1 day. You can book up to 1 year in advance.'}
      </Alert>
    </Box>
  );
}
