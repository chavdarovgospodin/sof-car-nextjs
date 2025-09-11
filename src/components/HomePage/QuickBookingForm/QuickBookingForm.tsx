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
import {
  QuickBookingFormProps,
  QuickBookingDates,
} from './QuickBookingForm.types';
import { styles } from './QuickBookingForm.styles';
import {
  getQuickBookingTexts,
  getInitialDates,
} from './QuickBookingForm.const';

function QuickBookingForm({
  currentLang,
  onShowSnackbar,
}: QuickBookingFormProps) {
  const router = useRouter();
  const texts = getQuickBookingTexts(currentLang);

  const [quickBookingDates, setQuickBookingDates] =
    useState<QuickBookingDates>(getInitialDates);

  const [error, setError] = useState<string>('');

  useEffect(() => {
    setError('');
  }, [quickBookingDates]);

  const handleDateChange = (
    field: keyof QuickBookingDates,
    value: string | dayjs.Dayjs | null
  ) => {
    setQuickBookingDates((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    const { pickupDate, returnDate, pickupTime, returnTime } =
      quickBookingDates;

    if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
      onShowSnackbar(
        currentLang === 'bg'
          ? 'Моля, попълнете всички полета'
          : 'Please fill in all fields',
        'warning'
      );
      return;
    }

    const pickupDateTime = dayjs(pickupDate)
      .hour(pickupTime.hour())
      .minute(pickupTime.minute())
      .second(0);

    const returnDateTime = dayjs(returnDate)
      .hour(returnTime.hour())
      .minute(returnTime.minute())
      .second(0);

    if (pickupDateTime.isSame(returnDateTime, 'day')) {
      setError(texts.sameDay);
      return;
    }

    if (
      returnDateTime.isBefore(pickupDateTime) ||
      returnDateTime.isSame(pickupDateTime)
    ) {
      setError(texts.invalidDates);
      return;
    }

    const dateRange = encodeDateRange(
      pickupDateTime.toDate(),
      returnDateTime.toDate()
    );
    router.push(`/${currentLang}/booking?dates=${dateRange}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper sx={styles.formContainer}>
        <Typography variant="h4" component="h2" sx={styles.formTitle}>
          {texts.title}
        </Typography>

        {error && (
          <Alert severity="error" sx={styles.alert}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2} sx={styles.formGrid}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DatePicker
              label={texts.pickupDate}
              value={dayjs(quickBookingDates.pickupDate)}
              onChange={(newValue) =>
                handleDateChange(
                  'pickupDate',
                  newValue && 'format' in newValue
                    ? newValue.format('YYYY-MM-DD')
                    : ''
                )
              }
              minDate={dayjs()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TimePicker
              label={texts.pickupTime}
              value={quickBookingDates.pickupTime}
              onChange={(newValue) =>
                handleDateChange(
                  'pickupTime',
                  newValue ? dayjs(newValue) : null
                )
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <DatePicker
              label={texts.returnDate}
              value={dayjs(quickBookingDates.returnDate)}
              onChange={(newValue) =>
                handleDateChange(
                  'returnDate',
                  newValue && 'format' in newValue
                    ? newValue.format('YYYY-MM-DD')
                    : ''
                )
              }
              minDate={dayjs(quickBookingDates.pickupDate).add(1, 'day')}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TimePicker
              label={texts.returnTime}
              value={quickBookingDates.returnTime}
              onChange={(newValue) =>
                handleDateChange(
                  'returnTime',
                  newValue ? dayjs(newValue) : null
                )
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                },
              }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          color="primary"
          startIcon={<Search />}
          onClick={handleSearch}
          sx={styles.searchButton}
        >
          {texts.searchButton}
        </Button>
      </Paper>
    </LocalizationProvider>
  );
}

export default QuickBookingForm;
