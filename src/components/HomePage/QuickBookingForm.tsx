'use client';

import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
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
  pickupTime: string;
  returnDate: string;
  returnTime: string;
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
        pickupTime: '09:00',
        returnDate: fiveDaysLater.toISOString().split('T')[0],
        returnTime: '17:00',
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

  const roundTimeTo15Minutes = (time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    // Only allow specific 15-minute intervals: 00, 15, 30, 45
    let allowedMinutes: number;
    if (minutes < 7.5) allowedMinutes = 0;
    else if (minutes < 22.5) allowedMinutes = 15;
    else if (minutes < 37.5) allowedMinutes = 30;
    else if (minutes < 52.5) allowedMinutes = 45;
    else allowedMinutes = 0; // Wrap around to next hour

    return `${hours.toString().padStart(2, '0')}:${allowedMinutes
      .toString()
      .padStart(2, '0')}`;
  };

  const handlePickupTimeChange = (time: string) => {
    // Validate that the time is a valid 15-minute interval
    const [hours, minutes] = time.split(':').map(Number);
    const validMinutes = [0, 15, 30, 45];

    if (!validMinutes.includes(minutes)) {
      // If invalid minutes, round to nearest valid interval
      const roundedTime = roundTimeTo15Minutes(time);
      setQuickBookingDates((prev) => ({
        ...prev,
        pickupTime: roundedTime,
      }));
    } else {
      // If valid minutes, use as is
      setQuickBookingDates((prev) => ({
        ...prev,
        pickupTime: time,
      }));
    }

    // Close the time picker after selection
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement.blur) {
      activeElement.blur();
    }
  };

  const handleReturnTimeChange = (time: string) => {
    // Validate that the time is a valid 15-minute interval
    const [hours, minutes] = time.split(':').map(Number);
    const validMinutes = [0, 15, 30, 45];

    if (!validMinutes.includes(minutes)) {
      // If invalid minutes, round to nearest valid interval
      const roundedTime = roundTimeTo15Minutes(time);
      setQuickBookingDates((prev) => ({
        ...prev,
        returnTime: roundedTime,
      }));
    } else {
      // If valid minutes, use as is
      setQuickBookingDates((prev) => ({
        ...prev,
        returnTime: time,
      }));
    }

    // Close the time picker after selection
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement.blur) {
      activeElement.blur();
    }
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
    const startDate = new Date(
      `${quickBookingDates.pickupDate}T${quickBookingDates.pickupTime}`
    );
    const endDate = new Date(
      `${quickBookingDates.returnDate}T${quickBookingDates.returnTime}`
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

    const startDate = new Date(
      `${quickBookingDates.pickupDate}T${quickBookingDates.pickupTime}`
    );
    const endDate = new Date(
      `${quickBookingDates.returnDate}T${quickBookingDates.returnTime}`
    );

    // Encode the dates in the URL with compressed format
    const params = new URLSearchParams();
    const encodedDates = encodeDateRange(startDate, endDate);
    params.set('d', encodedDates);

    router.push(`/${currentLang}/booking?${params.toString()}`);
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
          <TextField
            fullWidth
            type="time"
            label={currentLang === 'bg' ? 'Час вземане' : 'Pickup Time'}
            value={quickBookingDates.pickupTime}
            onChange={(e) => handlePickupTimeChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 900, // 15 minutes in seconds
              pattern: '[0-9]{2}:(00|15|30|45)', // HH:MM format - only 00, 15, 30, 45 minutes
              list: 'time-options',
            }}
            required
            size="small"
            onClick={(e) => {
              // Open the time picker when clicking anywhere on the input
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
          <TextField
            fullWidth
            type="time"
            label={currentLang === 'bg' ? 'Час връщане' : 'Return Time'}
            value={quickBookingDates.returnTime}
            onChange={(e) => handleReturnTimeChange(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              step: 900, // 15 minutes in seconds
              pattern: '[0-9]{2}:(00|15|30|45)', // HH:MM format - only 00, 15, 30, 45 minutes
              list: 'time-options',
            }}
            required
            size="small"
            onClick={(e) => {
              // Open the time picker when clicking anywhere on the input
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

      {/* Time options datalist for 15-minute intervals */}
      <datalist id="time-options">
        {Array.from({ length: 24 }, (_, hour) =>
          [0, 15, 30, 45].map(
            (minutes) =>
              `${hour.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}`
          )
        )
          .flat()
          .map((time) => (
            <option key={time} value={time} />
          ))}
      </datalist>
    </Paper>
  );
}
