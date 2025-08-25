'use client';

import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Search, CalendarToday, AccessTime } from '@mui/icons-material';

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
  // Дефолтен час 9:00 сутринта
  const getDefaultTime = (date: Date): Date => {
    const defaultDate = new Date(date);
    defaultDate.setHours(9, 0, 0, 0);
    return defaultDate;
  };

  const [startDate, setStartDate] = useState<Date | null>(() => {
    const today = new Date();
    return getDefaultTime(today);
  });
  const [endDate, setEndDate] = useState<Date | null>(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return getDefaultTime(tomorrow);
  });
  const [error, setError] = useState<string>('');

  // Функция за закръгляне на минутите до най-близките 15 минути
  const roundToNearest15Minutes = (date: Date): Date => {
    const minutes = date.getMinutes();
    const roundedMinutes = Math.round(minutes / 15) * 15;
    const newDate = new Date(date);
    newDate.setMinutes(roundedMinutes, 0, 0);
    return newDate;
  };

  // Функция за изчисляване на дните между две дати
  const calculateDays = (start: Date, end: Date): number => {
    const diffTime = end.getTime() - start.getTime();
    const diffHours = diffTime / (1000 * 60 * 60);
    const diffDays = diffHours / 24;

    // Ако е минало 24 часа, считаме за 2 дни
    if (diffHours > 24) {
      return Math.ceil(diffDays);
    }

    // Ако е под 24 часа, но е след полунощ, считаме за 1 ден
    if (start.getDate() !== end.getDate()) {
      return 1;
    }

    return 0;
  };

  const handleSearch = () => {
    if (!startDate || !endDate) {
      setError('Моля, изберете начална и крайна дата');
      return;
    }

    if (startDate >= endDate) {
      setError('Крайната дата трябва да е след началната');
      return;
    }

    // Поправяме валидацията - позволяваме днешната дата
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Нулираме часовете за сравнение

    if (startDate < today) {
      setError('Началната дата не може да е в миналото');
      return;
    }

    // Изчисляваме дните
    const days = calculateDays(startDate, endDate);
    if (days === 0) {
      setError('Минималният период е 1 ден');
      return;
    }

    setError('');
    onSearch(startDate, endDate);
  };

  const getMinEndDate = () => {
    if (!startDate) return undefined;
    const minDate = new Date(startDate);
    minDate.setMinutes(minDate.getMinutes() + 15); // Минимум 15 минути разлика
    return minDate;
  };

  const getMaxEndDate = () => {
    if (!startDate) return undefined;
    const maxDate = new Date(startDate);
    maxDate.setDate(maxDate.getDate() + 30); // Max 30 дни rental
    return maxDate;
  };

  // Функция за обработка на промяна на начална дата
  const handleStartDateChange = (newValue: Date | null) => {
    if (newValue) {
      const roundedDate = roundToNearest15Minutes(newValue);
      setStartDate(roundedDate);

      // Ако крайната дата е преди новата начална дата, я нулираме
      if (endDate && endDate <= roundedDate) {
        setEndDate(null);
      }
    } else {
      // Ако се нулира началната дата, задаваме дефолтна
      const today = new Date();
      setStartDate(getDefaultTime(today));
    }
    setError('');
  };

  // Функция за обработка на промяна на крайна дата
  const handleEndDateChange = (newValue: Date | null) => {
    if (newValue) {
      const roundedDate = roundToNearest15Minutes(newValue);
      setEndDate(roundedDate);
    } else {
      // Ако се нулира крайната дата, задаваме дефолтна (утре 9:00)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setEndDate(getDefaultTime(tomorrow));
    }
    setError('');
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
        {t('searchTitle')}
      </Typography>

      <Grid container spacing={4} alignItems="center">
        <Grid size={{ xs: 12, md: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label={t('startDate')}
              value={startDate}
              onChange={handleStartDateChange}
              minDate={new Date()}
              ampm={false}
              format="dd/MM/yyyy HH:mm"
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  InputProps: {
                    startAdornment: (
                      <CalendarToday
                        sx={{ marginRight: 1, color: '#1976d2' }}
                      />
                    ),
                  },
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                      },
                      '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                          borderWidth: 2,
                        },
                      },
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
              label={t('endDate')}
              value={endDate}
              onChange={handleEndDateChange}
              minDate={getMinEndDate()}
              maxDate={getMaxEndDate()}
              disabled={!startDate}
              ampm={false}
              format="dd/MM/yyyy HH:mm"
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  InputProps: {
                    startAdornment: (
                      <AccessTime sx={{ marginRight: 1, color: '#1976d2' }} />
                    ),
                  },
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                        },
                      },
                      '&.Mui-focused': {
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#1976d2',
                          borderWidth: 2,
                        },
                      },
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
            disabled={isLoading || !startDate || !endDate}
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
            {isLoading ? 'Търся...' : t('searchButton')}
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
          {t('dateRangeInfo')}
        </Typography>
      </Box>
    </Paper>
  );
};
