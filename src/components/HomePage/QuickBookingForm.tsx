'use client';

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
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

  const getTomorrowDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMinReturnDate = (): string => {
    if (!quickBookingDates.pickupDate) return '';
    const pickupDate = new Date(quickBookingDates.pickupDate);
    const minReturnDate = new Date(pickupDate);
    minReturnDate.setDate(minReturnDate.getDate() + 5);
    return minReturnDate.toISOString().split('T')[0];
  };

  const getMaxReturnDate = (): string => {
    if (!quickBookingDates.pickupDate) return '';
    const pickupDate = new Date(quickBookingDates.pickupDate);
    const maxReturnDate = new Date(pickupDate);
    maxReturnDate.setDate(maxReturnDate.getDate() + 30);
    return maxReturnDate.toISOString().split('T')[0];
  };

  const handlePickupTimeChange = (time: dayjs.Dayjs | null) => {
    setQuickBookingDates((prev) => ({
      ...prev,
      pickupTime: time,
    }));
  };

  const handleReturnTimeChange = (time: dayjs.Dayjs | null) => {
    setQuickBookingDates((prev) => ({
      ...prev,
      returnTime: time,
    }));
  };

  const handlePickupDateChange = (date: string) => {
    setQuickBookingDates((prev) => {
      const pickupDate = new Date(date);
      const returnDate = new Date(pickupDate);
      returnDate.setDate(returnDate.getDate() + 5);

      return {
        ...prev,
        pickupDate: date,
        returnDate: returnDate.toISOString().split('T')[0],
      };
    });
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
            <TextField
              fullWidth
              type="date"
              label={currentLang === 'bg' ? 'Дата вземане' : 'Pickup Date'}
              value={quickBookingDates.pickupDate}
              onChange={(e) => handlePickupDateChange(e.target.value)}
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: getTomorrowDate(),
              }}
              required
              size="small"
              onClick={(e) => {
                // Open the date picker when clicking anywhere on the input
                const input = e.currentTarget.querySelector('input');
                if (input) {
                  input.showPicker?.();
                }
              }}
              sx={{
                cursor: 'pointer',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  },
                },
                '& .MuiInputBase-input': {
                  cursor: 'pointer',
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TimePicker
              label={currentLang === 'bg' ? 'Час вземане' : 'Pickup Time'}
              value={quickBookingDates.pickupTime}
              onChange={handlePickupTimeChange}
              closeOnSelect
              minutesStep={15}
              ampm={false}
              skipDisabled
              thresholdToRenderTimeInASingleColumn={5}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  required: true,
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      cursor: 'pointer',
                    },
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              type="date"
              label={currentLang === 'bg' ? 'Дата връщане' : 'Return Date'}
              value={quickBookingDates.returnDate}
              onChange={(e) =>
                setQuickBookingDates((prev) => ({
                  ...prev,
                  returnDate: e.target.value,
                }))
              }
              InputLabelProps={{ shrink: true }}
              inputProps={{
                min: getMinReturnDate(),
                max: getMaxReturnDate(),
              }}
              required
              size="small"
              onClick={(e) => {
                // Open the date picker when clicking anywhere on the input
                const input = e.currentTarget.querySelector('input');
                if (input) {
                  input.showPicker?.();
                }
              }}
              sx={{
                cursor: 'pointer',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 1.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  },
                },
                '& .MuiInputBase-input': {
                  cursor: 'pointer',
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TimePicker
              label={currentLang === 'bg' ? 'Час връщане' : 'Return Time'}
              value={quickBookingDates.returnTime}
              onChange={handleReturnTimeChange}
              minutesStep={15}
              ampm={false}
              skipDisabled
              closeOnSelect
              thresholdToRenderTimeInASingleColumn={5}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                  required: true,
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      },
                    },
                    '& .MuiInputBase-input': {
                      cursor: 'pointer',
                    },
                  },
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleSearch}
              startIcon={<Search />}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
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
