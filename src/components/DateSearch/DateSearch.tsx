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

interface DateSearchProps {
  onSearch: (startDate: Date | null, endDate: Date | null) => void;
  isLoading?: boolean;
  t: (key: string, values?: Record<string, unknown>) => string;
}

export const DateSearch: React.FC<DateSearchProps> = ({
  onSearch,
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

  // Load dates from URL parameters on component mount
  useEffect(() => {
    const dateParam = searchParams.get('d'); // Use 'd' for date range

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
  }, [searchParams]); // Remove onSearch from dependencies to prevent infinite loop

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
  const handleStartDateChange = (newValue: Date | null) => {
    if (newValue) {
      const roundedDate = roundToNearest15Minutes(newValue);
      setStartDate(roundedDate);

      // Автоматично задаваме крайната дата на 5 дни след началната
      const fiveDaysLater = new Date(roundedDate);
      fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
      setEndDate(getDefaultTime(fiveDaysLater));

      // Close the picker after selection
      closeTimePicker();
    } else {
      // Ако се нулира началната дата, задаваме дефолтна (утре 9:00)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setStartDate(getDefaultTime(tomorrow));
    }
    setError('');
  };

  // Функция за обработка на промяна на крайна дата
  const handleEndDateChange = (newValue: Date | null) => {
    if (newValue) {
      const roundedDate = roundToNearest15Minutes(newValue);
      setEndDate(roundedDate);

      // Close the picker after selection
      closeTimePicker();
    } else {
      // Ако се нулира крайната дата, задаваме дефолтна (5 дни след началната дата)
      if (startDate) {
        const fiveDaysLater = new Date(startDate);
        fiveDaysLater.setDate(fiveDaysLater.getDate() + 5);
        setEndDate(getDefaultTime(fiveDaysLater));
      } else {
        const fiveDaysLater = new Date();
        fiveDaysLater.setDate(fiveDaysLater.getDate() + 6); // tomorrow + 5 days
        setEndDate(getDefaultTime(fiveDaysLater));
      }
    }
    setError('');
  };

  // Helper function to close time picker after selection
  const closeTimePicker = () => {
    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && activeElement.blur) {
        activeElement.blur();
      }
    }, 100); // Small delay to ensure the picker has processed the selection
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        backgroundColor: '#ffffff',
        borderRadius: 3,
        marginBottom: 3,
        border: '1px solid #e0e0e0',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      }}
    >
      {isInitializing && (
        <Box sx={{ textAlign: 'center', py: 2, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {t('booking.loadingDates')}
          </Typography>
        </Box>
      )}
      <Typography
        variant="h4"
        component="h2"
        sx={{
          textAlign: 'center',
          marginBottom: 4,
          color: '#1976d2',
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', md: '2rem' },
        }}
      >
        {t('booking.searchTitle')}
      </Typography>

      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              disableHighlightToday
              label={t('booking.startDate')}
              value={startDate}
              disabled={isLoading || isInitializing || !startDate || !endDate}
              onChange={handleStartDateChange}
              minDateTime={(() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                return tomorrow;
              })()}
              ampm={false}
              format="dd/MM/yyyy HH:mm"
              closeOnSelect={true}
              autoFocus={false}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  onClick: (e) => {
                    // Open the date/time picker when clicking anywhere on the input
                    const input = e.currentTarget.querySelector('input');
                    if (input) {
                      input.focus();
                    }
                  },
                  InputProps: {
                    startAdornment: (
                      <CalendarToday
                        sx={{ marginRight: 1, color: '#1976d2' }}
                      />
                    ),
                  },
                  sx: {
                    cursor: 'pointer',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      },
                      '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                          borderWidth: 2,
                        },
                      },
                    },
                    '& .MuiInputBase-input': {
                      cursor: 'pointer',
                    },
                  },
                },
                inputAdornment: {
                  position: 'end',
                },
                popper: {
                  sx: {
                    '& .MuiPickersLayout-root': {
                      backgroundColor: '#fff',
                      borderRadius: 2,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    },
                    '& .MuiPickersLayout-contentWrapper': {
                      backgroundColor: '#fff',
                    },
                    '& .MuiPickersLayout-actionBar': {
                      backgroundColor: '#f8f9fa',
                      borderTop: '1px solid #e0e0e0',
                    },
                  },
                },
              }}
              timeSteps={{ minutes: 15 }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label={t('booking.endDate')}
              value={endDate}
              onChange={handleEndDateChange}
              minDateTime={startDate ? getMinEndDate(startDate) : undefined}
              maxDateTime={startDate ? getMaxEndDate(startDate) : undefined}
              disabled={isLoading || isInitializing || !startDate || !endDate}
              ampm={false}
              format="dd/MM/yyyy HH:mm"
              closeOnSelect={true}
              autoFocus={false}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  onClick: (e) => {
                    // Open the date/time picker when clicking anywhere on the input
                    const input = e.currentTarget.querySelector('input');
                    if (input) {
                      input.focus();
                    }
                  },
                  InputProps: {
                    startAdornment: (
                      <AccessTime sx={{ marginRight: 1, color: '#1976d2' }} />
                    ),
                  },
                  sx: {
                    cursor: 'pointer',
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                        backgroundColor: '#f8f9fa',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      },
                      '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                          borderWidth: 2,
                        },
                      },
                    },
                    '& .MuiInputBase-input': {
                      cursor: 'pointer',
                    },
                    '& .MuiInputLabel-root': {
                      color: startDate ? '#1976d2' : '#666',
                    },
                  },
                },
                inputAdornment: {
                  position: 'end',
                },
                popper: {
                  sx: {
                    '& .MuiPickersLayout-root': {
                      backgroundColor: '#fff',
                      borderRadius: 2,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                    },
                    '& .MuiPickersLayout-contentWrapper': {
                      backgroundColor: '#fff',
                    },
                    '& .MuiPickersLayout-actionBar': {
                      backgroundColor: '#f8f9fa',
                      borderTop: '1px solid #e0e0e0',
                    },
                  },
                },
              }}
              timeSteps={{ minutes: 15 }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSearch}
            disabled={isLoading || isInitializing || !startDate || !endDate}
            startIcon={<Search />}
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#1565c0',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)',
              },
              height: 56,
              fontSize: '1.1rem',
              borderRadius: 2,
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
            }}
          >
            {isLoading
              ? t('booking.searchButtonLoading')
              : t('booking.searchButton')}
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Alert
          severity="error"
          sx={{
            marginTop: 3,
            borderRadius: 2,
            '& .MuiAlert-icon': {
              color: '#d32f2f',
            },
          }}
        >
          {error}
        </Alert>
      )}

      <Box sx={{ marginTop: 3, textAlign: 'center' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: 1,
            fontWeight: 500,
          }}
        >
          {t('booking.dateRangeInfo')}
        </Typography>
      </Box>
    </Paper>
  );
};
