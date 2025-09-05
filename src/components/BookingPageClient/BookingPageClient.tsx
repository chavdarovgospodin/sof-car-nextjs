'use client';

import React, { useState, Suspense } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import { DateSearch } from '../DateSearch/DateSearch';
import { CarCard } from '../CarCard/CarCard';
import type { CarData } from '../../types/api';
import { useCars, useCreateBooking } from '../../hooks/useApi';
import { BookingForm } from '../BookingForm/BookingForm';
import bgTranslations from '../../locales/bg/common.json';
import enTranslations from '../../locales/en/common.json';

interface BookingPageClientProps {
  lang: string;
}

export function BookingPageClient({ lang }: BookingPageClientProps) {
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchDates, setSearchDates] = useState<{
    start: Date | null;
    end: Date | null;
  }>(() => {
    // Дефолтен час 9:00 сутринта
    const getDefaultTime = (date: Date): Date => {
      const defaultDate = new Date(date);
      defaultDate.setHours(9, 0, 0, 0);
      return defaultDate;
    };

    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      start: getDefaultTime(today),
      end: getDefaultTime(tomorrow),
    };
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Флаг дали трябва да правим търсене - инициализираме като false
  const [shouldSearch, setShouldSearch] = useState(false);

  // React Query hook за налични автомобили
  const {
    data: carsResponse,
    isLoading,
    error,
    refetch,
  } = useCars(
    searchDates.start || undefined,
    searchDates.end || undefined,
    undefined,
    shouldSearch
  );

  const filteredCars: CarData[] =
    carsResponse?.cars?.map((car) => ({
      ...car,
      image_url: car.image_url,
      available: true, // We'll check availability separately
      features: car.features || [], // Use existing features or empty array
      price: car.price_per_day, // Map price_per_day to price for compatibility
    })) || [];

  // React Query hook за запазване на автомобил
  const bookCarMutation = useCreateBooking();

  const handleSearch = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return;
    setSearchDates({ start: startDate, end: endDate });
    setShouldSearch(true); // Активираме търсенето
  };

  const handleInitialized = (hasUrlParams: boolean) => {
    setShouldSearch(hasUrlParams); // Активираме търсенето ако има URL параметри
  };

  // URL parameters are now handled in DateSearch component
  // No need for localStorage logic here

  const handleBook = (car: CarData) => {
    setSelectedCar(car);
    setShowBookingForm(true);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedCar(null);
  };

  const handleBookingSubmit = async (formData: {
    clientFirstName: string;
    clientLastName: string;
    clientPhone: string;
    clientEmail: string;
    paymentMethod: string;
  }) => {
    if (!selectedCar || !searchDates.start || !searchDates.end) return;

    try {
      const bookingData = {
        carId: selectedCar.id,
        startDate: searchDates.start.toISOString().split('T')[0],
        endDate: searchDates.end.toISOString().split('T')[0],
        ...formData,
      };

      const result = await bookCarMutation.mutateAsync({
        car_id: selectedCar.id,
        start_date: searchDates.start.toISOString().split('T')[0],
        end_date: searchDates.end.toISOString().split('T')[0],
        client_first_name: formData.clientFirstName,
        client_last_name: formData.clientLastName,
        client_email: formData.clientEmail,
        client_phone: formData.clientPhone,
        payment_method: formData.paymentMethod as
          | 'cash'
          | 'card'
          | 'bank_transfer',
      });

      if (result) {
        setSnackbar({
          open: true,
          message:
            lang === 'en'
              ? 'Car booked successfully!'
              : 'Автомобилът е запазен успешно!',
          severity: 'success',
        });

        // Затваряме формата и обновяваме данните
        handleCloseBookingForm();
        refetch(); // Обновяваме списъка с налични автомобили
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message:
          lang === 'en'
            ? 'Error booking car'
            : 'Грешка при запазване на автомобил',
        severity: 'error',
      });
      console.error('Error booking car:', err);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Създаваме t функцията локално с подадения lang
  const t = (key: string, values?: Record<string, unknown>): string => {
    const keys = key.split('.');
    let value: unknown = lang === 'en' ? enTranslations : bgTranslations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`Translation key not found: ${key} for language: ${lang}`);
        return key;
      }
    }

    let result = typeof value === 'string' ? value : key;

    // Заменяме placeholders с реални стойности
    if (values) {
      Object.keys(values).forEach((k) => {
        result = result.replace(`{${k}}`, String(values[k]));
      });
    }

    return result;
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingY: 4 }}>
      <Container maxWidth="xl">
        <Suspense fallback={<CircularProgress />}>
          <DateSearch
            onSearch={handleSearch}
            onInitialized={handleInitialized}
            isLoading={isLoading}
            t={t}
          />
        </Suspense>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 3 }}>
            {lang === 'en'
              ? 'Error searching cars'
              : 'Грешка при търсене на автомобили'}
          </Alert>
        )}

        {!shouldSearch ? (
          <Box sx={{ textAlign: 'center', padding: 4 }}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ marginBottom: 2 }}
            >
              {t('booking.selectDatesMessage')}
            </Typography>
          </Box>
        ) : isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <CircularProgress size={60} />
          </Box>
        ) : filteredCars.length > 0 ? (
          <>
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                {t('booking.foundCars', { count: filteredCars.length })}
                {searchDates.start && searchDates.end && (
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 1,
                      marginLeft: 1,
                      padding: '8px 16px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: 2,
                      border: '1px solid #e0e0e0',
                      fontSize: '0.9rem',
                      color: '#666',
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{ color: '#1976d2', fontWeight: 600 }}
                    >
                      {t('booking.forPeriod')}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        padding: '4px 8px',
                        backgroundColor: '#fff',
                        borderRadius: 1,
                        border: '1px solid #e0e0e0',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: '#333' }}
                      >
                        {searchDates.start.toLocaleDateString(
                          lang === 'en' ? 'en-US' : 'bg-BG'
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#1976d2',
                          fontWeight: 600,
                          backgroundColor: '#e3f2fd',
                          padding: '2px 6px',
                          borderRadius: 1,
                          fontSize: '0.8rem',
                        }}
                      >
                        {searchDates.start.toLocaleTimeString(
                          lang === 'en' ? 'en-US' : 'bg-BG',
                          { hour: '2-digit', minute: '2-digit' }
                        )}
                      </Typography>
                    </Box>
                    <Typography
                      component="span"
                      sx={{ color: '#666', fontWeight: 400 }}
                    >
                      -
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        padding: '4px 8px',
                        backgroundColor: '#fff',
                        borderRadius: 1,
                        border: '1px solid #e0e0e0',
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: '#333' }}
                      >
                        {searchDates.end.toLocaleDateString(
                          lang === 'en' ? 'en-US' : 'bg-BG'
                        )}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#1976d2',
                          fontWeight: 600,
                          backgroundColor: '#e3f2fd',
                          padding: '2px 6px',
                          borderRadius: 1,
                          fontSize: '0.8rem',
                        }}
                      >
                        {searchDates.end.toLocaleTimeString(
                          lang === 'en' ? 'en-US' : 'bg-BG',
                          { hour: '2-digit', minute: '2-digit' }
                        )}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {filteredCars.map((car) => {
                return (
                  <Grid key={car.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <CarCard
                      car={car}
                      onBook={handleBook}
                      t={t}
                      rentalDates={searchDates}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </>
        ) : (
          <Box sx={{ textAlign: 'center', padding: 4 }}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ marginBottom: 2 }}
            >
              {t('booking.noCarsFound')}
            </Typography>
          </Box>
        )}

        {selectedCar && (
          <BookingForm
            car={selectedCar}
            searchDates={searchDates}
            onSubmit={handleBookingSubmit}
            isLoading={bookCarMutation.isPending}
            t={t}
            open={showBookingForm}
            onClose={handleCloseBookingForm}
            lang={lang}
          />
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
