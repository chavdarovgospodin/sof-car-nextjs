'use client';

import React, { useState, useEffect } from 'react';
import { Button, Grid, Typography, Paper, Alert } from '@mui/material';
import { Search } from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { encodeDateRange } from '@/utils/dateUtils';

interface QuickBookingFormProps {
  currentLang: string;
  onShowSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => void;
}

interface QuickBookingDates {
  pickupDate: string;
  pickupTime: dayjs.Dayjs | null;
  returnDate: string;
  returnTime: dayjs.Dayjs | null;
}

export function QuickBookingForm({
  currentLang,
  onShowSnackbar,
}: QuickBookingFormProps) {
  const router = useRouter();

  const [quickBookingDates, setQuickBookingDates] = useState<QuickBookingDates>(
    () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(9, 0, 0, 0);

      const fiveDaysLater = new Date(tomorrow);
      fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
      fiveDaysLater.setHours(17, 0, 0, 0);

      return {
        pickupDate: tomorrow.toISOString().split('T')[0],
        pickupTime: dayjs().hour(9).minute(0).second(0),
        returnDate: fiveDaysLater.toISOString().split('T')[0],
        returnTime: dayjs().hour(17).minute(0).second(0),
      };
    }
  );

  // State for controlling picker open/close
  const [pickupTimeOpen, setPickupTimeOpen] = useState(false);
  const [returnTimeOpen, setReturnTimeOpen] = useState(false);
  const [pickupDateOpen, setPickupDateOpen] = useState(false);
  const [returnDateOpen, setReturnDateOpen] = useState(false);

  // State for tracking current view in time pickers
  const [pickupTimeView, setPickupTimeView] = useState<'hours' | 'minutes'>(
    'hours'
  );
  const [returnTimeView, setReturnTimeView] = useState<'hours' | 'minutes'>(
    'hours'
  );

  // Error state for real-time validation
  const [error, setError] = useState<string>('');

  // Real-time validation when dates or times change
  useEffect(() => {
    if (
      !quickBookingDates.pickupDate ||
      !quickBookingDates.returnDate ||
      !quickBookingDates.pickupTime ||
      !quickBookingDates.returnTime
    ) {
      setError('');
      return;
    }

    // Clear error first
    setError('');

    const pickupTimeStr = quickBookingDates.pickupTime.format('HH:mm');
    const returnTimeStr = quickBookingDates.returnTime.format('HH:mm');

    const startDate = new Date(
      `${quickBookingDates.pickupDate}T${pickupTimeStr}`
    );
    const endDate = new Date(
      `${quickBookingDates.returnDate}T${returnTimeStr}`
    );

    // Validate that end date is after start date
    if (startDate >= endDate) {
      setError(
        currentLang === 'bg'
          ? 'Крайната дата трябва да е след началната'
          : 'End date must be after start date'
      );
      return;
    }

    // Check minimum 5 days
    const diffTime = endDate.getTime() - startDate.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays < 5) {
      setError(
        currentLang === 'bg'
          ? 'Минималният период е 5 дни'
          : 'Minimum rental period is 5 days'
      );
      return;
    }

    // Check if start date is from tomorrow onwards
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (startDate < tomorrow) {
      setError(
        currentLang === 'bg'
          ? 'Началната дата трябва да е от утре нататък'
          : 'Start date must be from tomorrow onwards'
      );
      return;
    }

    // Check maximum 30 days
    if (diffDays > 30) {
      setError(
        currentLang === 'bg'
          ? 'Максималният период е 30 дни'
          : 'Maximum rental period is 30 days'
      );
      return;
    }

    // Check advance booking limit (3 months)
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    if (startDate > threeMonthsFromNow) {
      setError(
        currentLang === 'bg'
          ? 'Не можете да резервирате повече от 3 месеца напред'
          : 'Cannot book more than 3 months in advance'
      );
      return;
    }

    // If all validations pass, clear error
    setError('');
  }, [quickBookingDates, currentLang]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePickupTimeChange = (value: any) => {
    const time = value ? dayjs(value) : null;
    setQuickBookingDates((prev) => ({
      ...prev,
      pickupTime: time,
    }));

    // Close picker if user is selecting minutes (they've already selected hour)
    if (pickupTimeView === 'minutes') {
      setPickupTimeOpen(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePickupTimeViewChange = (view: any) => {
    setPickupTimeView(view);
    console.log('Pickup time view changed to:', view);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReturnTimeChange = (value: any) => {
    const time = value ? dayjs(value) : null;
    setQuickBookingDates((prev) => ({
      ...prev,
      returnTime: time,
    }));

    // Close picker if user is selecting minutes (they've already selected hour)
    if (returnTimeView === 'minutes') {
      setReturnTimeOpen(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReturnTimeViewChange = (view: any) => {
    setReturnTimeView(view);
    console.log('Return time view changed to:', view);
  };

  // Function to disable time slots outside business hours (8:00-20:00)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shouldDisableTime = (value: any, view: any) => {
    if (!value) return false;
    const dayjsValue = dayjs(value);
    if (view === 'hours') {
      const hour = dayjsValue.hour();
      return hour < 8 || hour >= 20; // Disable hours before 8 AM and after 8 PM
    }
    return false; // Allow all minutes
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePickupDateChange = (value: any) => {
    // Only update if user actually selected something
    if (!value) return;

    const date = dayjs(value);
    const dateString = date.format('YYYY-MM-DD');

    setQuickBookingDates((prev) => {
      const pickupDate = new Date(dateString);
      const returnDate = new Date(pickupDate);
      returnDate.setDate(returnDate.getDate() + 5);

      return {
        ...prev,
        pickupDate: dateString,
        returnDate: returnDate.toISOString().split('T')[0],
      };
    });
    setPickupDateOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleReturnDateChange = (value: any) => {
    // Only update if user actually selected something
    if (!value) return;

    const date = dayjs(value);
    const dateString = date.format('YYYY-MM-DD');

    setQuickBookingDates((prev) => ({
      ...prev,
      returnDate: dateString,
    }));
    setReturnDateOpen(false);
  };

  const validateQuickBooking = (): boolean => {
    const pickupTimeStr =
      quickBookingDates.pickupTime?.format('HH:mm') || '09:00';
    const returnTimeStr =
      quickBookingDates.returnTime?.format('HH:mm') || '17:00';

    const startDate = new Date(
      `${quickBookingDates.pickupDate}T${pickupTimeStr}`
    );
    const endDate = new Date(
      `${quickBookingDates.returnDate}T${returnTimeStr}`
    );

    if (startDate >= endDate) {
      onShowSnackbar(
        currentLang === 'bg'
          ? 'Крайната дата трябва да е след началната'
          : 'End date must be after start date',
        'error'
      );
      return false;
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (startDate < tomorrow) {
      onShowSnackbar(
        currentLang === 'bg'
          ? 'Началната дата трябва да е от утре нататък'
          : 'Start date must be from tomorrow onwards',
        'error'
      );
      return false;
    }

    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 5) {
      onShowSnackbar(
        currentLang === 'bg'
          ? 'Минималният период е 5 дни'
          : 'Minimum rental period is 5 days',
        'error'
      );
      return false;
    }

    if (diffDays > 30) {
      onShowSnackbar(
        currentLang === 'bg'
          ? 'Максималният период е 30 дни'
          : 'Maximum rental period is 30 days',
        'error'
      );
      return false;
    }

    // Check advance booking limit (3 months)
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

    if (startDate > threeMonthsFromNow) {
      onShowSnackbar(
        currentLang === 'bg'
          ? 'Не можете да резервирате повече от 3 месеца напред'
          : 'Cannot book more than 3 months in advance',
        'error'
      );
      return false;
    }

    return true;
  };

  const handleSearch = () => {
    if (!validateQuickBooking()) {
      return;
    }

    const pickupTimeStr =
      quickBookingDates.pickupTime?.format('HH:mm') || '09:00';
    const returnTimeStr =
      quickBookingDates.returnTime?.format('HH:mm') || '17:00';

    const startDate = new Date(
      `${quickBookingDates.pickupDate}T${pickupTimeStr}`
    );
    const endDate = new Date(
      `${quickBookingDates.returnDate}T${returnTimeStr}`
    );

    // Encode the dates in the URL with compressed format
    const params = new URLSearchParams();
    const encodedDates = encodeDateRange(startDate, endDate);
    params.set('d', encodedDates);

    router.push(`/${currentLang}/booking?${params.toString()}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
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
            marginBottom: 5,
            color: '#1976d2',
            fontWeight: 'bold',
          }}
        >
          {currentLang === 'bg'
            ? 'Изберете дати и клас автомобил за бърза резервация'
            : 'Choose dates and car class for quick booking'}
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DatePicker
              label={currentLang === 'bg' ? 'Дата вземане' : 'Pickup Date'}
              value={dayjs(quickBookingDates.pickupDate)}
              onChange={handlePickupDateChange}
              open={pickupDateOpen}
              onOpen={() => setPickupDateOpen(true)}
              onClose={() => setPickupDateOpen(false)}
              minDate={dayjs().add(1, 'day')}
              maxDate={dayjs().add(3, 'month')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  required: true,
                  onClick: () => setPickupDateOpen(true),
                  onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    (e.target as HTMLElement).blur();
                    setPickupDateOpen(true);
                  },
                  inputProps: {
                    readOnly: true,
                    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      (e.target as HTMLElement).blur();
                      setPickupDateOpen(true);
                    },
                  },
                  sx: {
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      cursor: 'pointer',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      pointerEvents: 'none',
                    },
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TimePicker
              label={currentLang === 'bg' ? 'Час вземане' : 'Pickup Time'}
              value={quickBookingDates.pickupTime}
              onChange={handlePickupTimeChange}
              onViewChange={handlePickupTimeViewChange}
              view={pickupTimeView}
              open={pickupTimeOpen}
              onOpen={() => setPickupTimeOpen(true)}
              onClose={() => setPickupTimeOpen(false)}
              minutesStep={15}
              ampm={false}
              skipDisabled
              closeOnSelect
              shouldDisableTime={shouldDisableTime}
              thresholdToRenderTimeInASingleColumn={5}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  required: true,
                  onClick: () => setPickupTimeOpen(true),
                  onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    (e.target as HTMLElement).blur();
                    setPickupTimeOpen(true);
                  },
                  inputProps: {
                    readOnly: true,
                    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      (e.target as HTMLElement).blur();
                      setPickupTimeOpen(true);
                    },
                  },
                  sx: {
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      cursor: 'pointer',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      pointerEvents: 'none',
                    },
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <DatePicker
              label={currentLang === 'bg' ? 'Дата връщане' : 'Return Date'}
              value={dayjs(quickBookingDates.returnDate)}
              onChange={handleReturnDateChange}
              open={returnDateOpen}
              onOpen={() => setReturnDateOpen(true)}
              onClose={() => setReturnDateOpen(false)}
              minDate={dayjs(quickBookingDates.pickupDate).add(5, 'day')}
              maxDate={dayjs(quickBookingDates.pickupDate).add(30, 'day')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  required: true,
                  onClick: () => setReturnDateOpen(true),
                  onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    (e.target as HTMLElement).blur();
                    setReturnDateOpen(true);
                  },
                  inputProps: {
                    readOnly: true,
                    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      (e.target as HTMLElement).blur();
                      setReturnDateOpen(true);
                    },
                  },
                  sx: {
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      cursor: 'pointer',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      pointerEvents: 'none',
                    },
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TimePicker
              label={currentLang === 'bg' ? 'Час връщане' : 'Return Time'}
              value={quickBookingDates.returnTime}
              onChange={handleReturnTimeChange}
              onViewChange={handleReturnTimeViewChange}
              view={returnTimeView}
              open={returnTimeOpen}
              onOpen={() => setReturnTimeOpen(true)}
              onClose={() => setReturnTimeOpen(false)}
              minutesStep={15}
              closeOnSelect
              ampm={false}
              skipDisabled
              shouldDisableTime={shouldDisableTime}
              thresholdToRenderTimeInASingleColumn={5}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  required: true,
                  onClick: () => setReturnTimeOpen(true),
                  onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    (e.target as HTMLElement).blur();
                    setReturnTimeOpen(true);
                  },
                  inputProps: {
                    readOnly: true,
                    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      (e.target as HTMLElement).blur();
                      setReturnTimeOpen(true);
                    },
                  },
                  sx: {
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      cursor: 'pointer',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      pointerEvents: 'none',
                    },
                  },
                },
              }}
            />
          </Grid>

          {error && (
            <Grid size={{ xs: 12 }}>
              <Alert
                severity="error"
                sx={{
                  marginBottom: 2,
                  borderRadius: 2,
                  '& .MuiAlert-icon': {
                    color: '#d32f2f',
                  },
                }}
              >
                {error}
              </Alert>
            </Grid>
          )}

          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSearch}
              disabled={!!error}
              startIcon={<Search />}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                '&:disabled': {
                  backgroundColor: '#ccc',
                  color: '#666',
                },
                height: 48,
                fontWeight: 'bold',
                fontSize: '1.1rem',
              }}
            >
              {currentLang === 'bg' ? 'Търси автомобили' : 'Search cars'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
}
