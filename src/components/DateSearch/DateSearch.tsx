'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Paper, Button, Typography, Grid, Alert } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Search, CalendarToday, AccessTime } from '@mui/icons-material';
import {
  calculateDays,
  getDefaultTime,
  getMaxEndDate,
  getMinEndDate,
  roundToNearest15Minutes,
  encodeDateRange,
  decodeDateRange,
} from '@/utils/dateUtils';
import { DateSearchProps } from './DateSearch.types';
import { styles } from './DateSearch.styles';
import {
  getMinStartDate,
  shouldDisableTime,
  timeSteps,
  dateFormat,
} from './DateSearch.const';

export const DateSearch: React.FC<DateSearchProps> = ({
  onSearch,
  onInitialized,
  isLoading = false,
  t,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasInitialized = useRef(false);
  const [isInitializing, setIsInitializing] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return getDefaultTime(tomorrow);
  });
  const [endDate, setEndDate] = useState<Date | null>(() => {
    const fiveDaysLater = new Date();
    fiveDaysLater.setDate(fiveDaysLater.getDate() + 6); // tomorrow + 5 days
    return getDefaultTime(fiveDaysLater);
  });
  const [error, setError] = useState<string>('');

  // State for controlling picker open/close
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);

  // Load dates from URL parameters on component mount
  useEffect(() => {
    const dateParam = searchParams.get('d'); // Use 'd' for date range
    const hasUrlParams = !!dateParam;

    // Notify parent about URL params status
    if (onInitialized) {
      onInitialized(hasUrlParams);
    }

    if (dateParam) {
      try {
        // Set loading state immediately
        setIsInitializing(true);

        // Decode the compressed date range
        const { startDate: start, endDate: end } = decodeDateRange(dateParam);

        // Validate dates
        if (start && end && start < end && start > new Date()) {
          setStartDate(start);
          setEndDate(end);

          // Only trigger search on initial load, not from URL updates
          if (!hasInitialized.current) {
            hasInitialized.current = true;
            // Trigger search immediately without delay
            onSearch(start, end);
          }
        }
      } catch (error) {
        console.warn('Invalid date parameter in URL:', error);
      } finally {
        // Always clear loading state
        setIsInitializing(false);
      }
    }
  }, [searchParams, onSearch, onInitialized]); // Add onInitialized to dependencies

  // Real-time validation when dates change
  useEffect(() => {
    if (!startDate || !endDate) {
      setError('');
      return;
    }

    // Clear error first
    setError('');

    // Validate dates in real-time
    if (startDate >= endDate) {
      setError('Крайната дата трябва да е след началната');
      return;
    }

    // Check minimum 5 days
    const days = calculateDays(startDate, endDate);
    if (days < 5) {
      setError('Минималният период е 5 дни');
      return;
    }

    // Check if start date is from tomorrow onwards
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    if (startDate < tomorrow) {
      setError('Началната дата трябва да е от утре нататък');
      return;
    }

    // If all validations pass, clear error
    setError('');
  }, [startDate, endDate]);

  const handleSearch = () => {
    if (!startDate || !endDate) {
      setError('Моля, изберете начална и крайна дата');
      return;
    }

    if (startDate >= endDate) {
      setError('Крайната дата трябва да е след началната');
      return;
    }

    // Валидацията - не позволяваме днешната дата
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Нулираме часовете за сравнение

    if (startDate < tomorrow) {
      setError('Началната дата трябва да е от утре нататък');
      return;
    }

    // Изчисляваме дните
    const days = calculateDays(startDate, endDate);
    if (days < 5) {
      setError('Минималният период е 5 дни');
      return;
    }

    // Clear any existing errors
    setError('');

    // Encode dates in URL with compressed format
    const params = new URLSearchParams();
    const encodedDates = encodeDateRange(startDate, endDate);
    params.set('d', encodedDates);

    // Update URL without page reload
    router.push(`?${params.toString()}`, { scroll: false });

    onSearch(startDate, endDate);
  };

  // Функция за обработка на промяна на начална дата
  const handleStartDateChange = (value: unknown) => {
    // Only update if user actually selected something and it's different from current
    if (!value) return;

    const newValue = new Date(value as Date);
    const roundedDate = roundToNearest15Minutes(newValue);

    // Check if the new date is actually different from current startDate
    if (
      startDate &&
      Math.abs(roundedDate.getTime() - startDate.getTime()) < 1000
    ) {
      return; // Same date, don't update
    }

    setStartDate(roundedDate);

    // Автоматично задаваме крайната дата на 5 дни след началната
    const fiveDaysLater = new Date(roundedDate);
    fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
    setEndDate(getDefaultTime(fiveDaysLater));

    // Clear error when changing start date
    setError('');
  };

  // Функция за обработка на промяна на крайна дата
  const handleEndDateChange = (value: unknown) => {
    // Only update if user actually selected something and it's different from current
    if (!value) return;

    const newValue = new Date(value as Date);
    const roundedDate = roundToNearest15Minutes(newValue);

    // Check if the new date is actually different from current endDate
    if (endDate && Math.abs(roundedDate.getTime() - endDate.getTime()) < 1000) {
      return; // Same date, don't update
    }

    setEndDate(roundedDate);

    setError('');
  };

  return (
    <Paper elevation={3} sx={styles.paper}>
      {isInitializing && (
        <Box sx={styles.loadingContainer}>
          <Typography variant="body2" color="text.secondary">
            {t('booking.loadingDates')}
          </Typography>
        </Box>
      )}
      <Typography variant="h4" component="h2" sx={styles.title}>
        {t('booking.searchTitle')}
      </Typography>

      <Grid container spacing={4} sx={styles.grid}>
        <Grid size={{ xs: 12, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              disableHighlightToday
              closeOnSelect
              label={t('booking.startDate')}
              value={startDate}
              disabled={isLoading || isInitializing || !startDate || !endDate}
              onChange={handleStartDateChange}
              open={startDateOpen}
              onOpen={() => setStartDateOpen(true)}
              onClose={() => {
                setStartDateOpen(false);
                // Don't clear errors automatically - let validation handle it
              }}
              minDateTime={getMinStartDate()}
              ampm={false}
              format={dateFormat}
              autoFocus={false}
              shouldDisableTime={shouldDisableTime}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  onClick: () => setStartDateOpen(true),
                  onFocus: (e: React.FocusEvent) => {
                    e.preventDefault();
                    (e.target as HTMLElement).blur();
                    setStartDateOpen(true);
                  },
                  inputProps: {
                    readOnly: true,
                    onFocus: (e: React.FocusEvent) => {
                      e.preventDefault();
                      (e.target as HTMLElement).blur();
                      setStartDateOpen(true);
                    },
                  },
                  InputProps: {
                    startAdornment: <CalendarToday sx={styles.calendarIcon} />,
                  },
                  sx: styles.datePickerTextField,
                },
                inputAdornment: {
                  position: 'end',
                },
                popper: {
                  sx: styles.popper,
                },
              }}
              timeSteps={timeSteps}
            />
          </LocalizationProvider>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label={t('booking.endDate')}
              value={endDate}
              onChange={handleEndDateChange}
              open={endDateOpen}
              onOpen={() => setEndDateOpen(true)}
              onClose={() => {
                setEndDateOpen(false);
                // Don't clear errors automatically - let validation handle it
              }}
              minDateTime={startDate ? getMinEndDate(startDate) : undefined}
              maxDateTime={startDate ? getMaxEndDate(startDate) : undefined}
              disabled={isLoading || isInitializing || !startDate || !endDate}
              ampm={false}
              format={dateFormat}
              autoFocus={false}
              closeOnSelect
              shouldDisableTime={shouldDisableTime}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  onClick: () => setEndDateOpen(true),
                  onFocus: (e: React.FocusEvent) => {
                    e.preventDefault();
                    (e.target as HTMLElement).blur();
                    setEndDateOpen(true);
                  },
                  inputProps: {
                    readOnly: true,
                    onFocus: (e: React.FocusEvent) => {
                      e.preventDefault();
                      (e.target as HTMLElement).blur();
                      setEndDateOpen(true);
                    },
                  },
                  InputProps: {
                    startAdornment: <AccessTime sx={styles.timeIcon} />,
                  },
                  sx: styles.endDateTextField,
                },
                inputAdornment: {
                  position: 'end',
                },
                popper: {
                  sx: styles.popper,
                },
              }}
              timeSteps={timeSteps}
            />
          </LocalizationProvider>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSearch}
            disabled={
              isLoading ||
              isInitializing ||
              !startDate ||
              !endDate ||
              Boolean(error)
            }
            startIcon={<Search />}
            sx={styles.searchButton}
          >
            {isLoading
              ? t('booking.searchButtonLoading')
              : t('booking.searchButton')}
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Alert severity="error" sx={styles.errorAlert}>
          {error}
        </Alert>
      )}

      <Box sx={styles.infoContainer}>
        <Typography variant="body2" color="text.secondary" sx={styles.infoText}>
          {t('booking.dateRangeInfo')}
        </Typography>
      </Box>
    </Paper>
  );
};
