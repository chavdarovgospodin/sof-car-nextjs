'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from '@mui/material';
import { DateSearch } from '../DateSearch/DateSearch';
import { CarCard } from '../CarCard/CarCard';
import { CarData } from '../../services/googleSheets';
import { useAvailableCars, useBookCar } from '../../hooks/useGoogleSheets';
import { BookingForm } from '../BookingForm/BookingForm';

export function BookingPageClient() {
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
  const [locale, setLocale] = useState('bg');
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    // Определяме локала от URL
    const path = window.location.pathname;
    if (path.includes('/en/')) {
      setLocale('en');
    } else {
      setLocale('bg');
    }
  }, []);

  // Флаг дали трябва да правим търсене
  const [shouldSearch, setShouldSearch] = useState(false);

  // React Query hook за налични автомобили
  const {
    data: filteredCars = [],
    isLoading,
    error,
    refetch,
  } = useAvailableCars(
    searchDates.start?.toISOString().split('T')[0] || '',
    searchDates.end?.toISOString().split('T')[0] || '',
    shouldSearch // Не прави автоматично търсене
  );

  // React Query hook за запазване на автомобил
  const bookCarMutation = useBookCar();

  const handleSearch = (startDate: Date | null, endDate: Date | null) => {
    if (!startDate || !endDate) return;
    setSearchDates({ start: startDate, end: endDate });
    setShouldSearch(true); // Активираме търсенето
  };

  // Четем дати от localStorage и правим автоматично търсене само ако има такива
  useEffect(() => {
    // Проверяваме дали сме в браузъра
    if (typeof window !== 'undefined') {
      const savedDates = localStorage.getItem('quickBookingDates');
      if (savedDates) {
        try {
          const parsed = JSON.parse(savedDates);
          const startDate = new Date(
            `${parsed.pickupDate}T${parsed.pickupTime}`
          );
          const endDate = new Date(`${parsed.returnDate}T${parsed.returnTime}`);

          // Проверяваме дали датите са валидни (не са в миналото)
          const now = new Date();
          if (startDate < now || endDate < now) {
            // Датите са в миналото - изчистваме ги
            localStorage.removeItem('quickBookingDates');
            return;
          }

          // Обновяваме state-а с новите дати
          setSearchDates({ start: startDate, end: endDate });

          // Правим автоматично търсене
          const timer = setTimeout(() => {
            handleSearch(startDate, endDate);
            // Изчистваме localStorage СЛЕД успешното търсене
            localStorage.removeItem('quickBookingDates');
          }, 100);

          return () => clearTimeout(timer);
        } catch (error) {
          console.error('Error parsing saved dates:', error);
          // Ако има грешка при парсването, изчистваме localStorage
          localStorage.removeItem('quickBookingDates');
        }
      }
    }
  }, []); // Празен dependency array - само при първо зареждане

  const handleBook = (car: CarData) => {
    setSelectedCar(car);
    setShowBookingForm(true);
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false);
    setSelectedCar(null);
  };

  const handleBookingSubmit = async (formData: {
    clientName: string;
    clientPhone: string;
    clientEmail: string;
  }) => {
    if (!selectedCar || !searchDates.start || !searchDates.end) return;

    try {
      const bookingData = {
        carId: selectedCar.id,
        startDate: searchDates.start.toISOString().split('T')[0],
        endDate: searchDates.end.toISOString().split('T')[0],
        ...formData,
      };

      const result = await bookCarMutation.mutateAsync(bookingData);

      if (result.success) {
        setSnackbar({
          open: true,
          message:
            locale === 'en'
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
          locale === 'en'
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

  const translations = {
    bg: {
      pageTitle: 'Резервирай автомобил',
      pageSubtitle: 'Избери своя автомобил и резервирай за предпочитаните дати',
      foundCars: 'Намерени {count} автомобила',
      forPeriod: 'за периода',
      noCarsFound: 'Няма налични автомобили за избраните дати',
      selectDatesMessage: 'Изберете дати за да видите наличните автомобили',
      bookTitle: 'Резервирай',
      cancelButton: 'Отказ',
      searchTitle: 'Търси автомобил за наем',
      startDate: 'Начална дата и час',
      endDate: 'Крайна дата и час',
      searchButton: 'Търси автомобили',
      dateRangeInfo: 'Минимален период: 5 ден | Максимален период: 30 дни',
      bookButton: 'Резервирай',
      requestOfferButton: 'Оферта по e-mail',
      class: 'Клас',
      priceIncludes: 'Цената включва',
      unlimitedMileage: 'Неограничени километри',
      insurance: 'Застраховка',
      assistance: 'Пътна помощ',
      fuel: 'Гориво',
    },
    en: {
      pageTitle: 'Book a Car',
      pageSubtitle: 'Choose your car and book for preferred dates',
      foundCars: 'Found {count} cars',
      forPeriod: 'for the period',
      noCarsFound: 'No available cars for selected dates',
      selectDatesMessage: 'Select dates to see available cars',
      bookTitle: 'Book',
      cancelButton: 'Cancel',
      searchTitle: 'Search for a car to rent',
      startDate: 'Start Date & Time',
      endDate: 'End Date & Time',
      searchButton: 'Search Cars',
      dateRangeInfo: 'Minimum period: 1 day | Maximum period: 30 days',
      bookButton: 'Book',
      requestOfferButton: 'Request Quote by Email',
      class: 'Class',
      priceIncludes: 'Price includes',
      unlimitedMileage: 'Unlimited mileage',
      insurance: 'Insurance',
      assistance: 'Roadside assistance',
      fuel: 'Fuel',
    },
  };

  const t = (key: string, values?: Record<string, unknown>) => {
    let message =
      translations[locale as keyof typeof translations]?.[
        key as keyof typeof translations.bg
      ] || key;
    if (values) {
      Object.keys(values).forEach((k) => {
        message = message.replace(`{${k}}`, String(values[k]));
      });
    }
    return message;
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingY: 4 }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ color: '#1976d2', fontWeight: 'bold', marginBottom: 2 }}
          >
            {t('pageTitle')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {t('pageSubtitle')}
          </Typography>
        </Box>

        <DateSearch onSearch={handleSearch} isLoading={isLoading} t={t} />

        {error && (
          <Alert severity="error" sx={{ marginBottom: 3 }}>
            {locale === 'en'
              ? 'Error searching cars'
              : 'Грешка при търсене на автомобили'}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <CircularProgress size={60} />
          </Box>
        ) : filteredCars.length > 0 ? (
          <>
            <Box sx={{ marginBottom: 3 }}>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                {t('foundCars', { count: filteredCars.length })}
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
                      {t('forPeriod')}
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
                          locale === 'en' ? 'en-US' : 'bg-BG'
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
                          locale === 'en' ? 'en-US' : 'bg-BG',
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
                          locale === 'en' ? 'en-US' : 'bg-BG'
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
                          locale === 'en' ? 'en-US' : 'bg-BG',
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
                console.log('Car data:', car);
                console.log('Car image URL:', car.imageUrl);
                return (
                  <Grid key={car.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <CarCard car={car} onBook={handleBook} t={t} />
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
              {searchDates.start && searchDates.end
                ? t('noCarsFound')
                : t('selectDatesMessage')}
            </Typography>
          </Box>
        )}

        <Dialog
          open={showBookingForm}
          onClose={handleCloseBookingForm}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {t('bookTitle')} {selectedCar?.make} {selectedCar?.model}
          </DialogTitle>
          <DialogContent>
            {selectedCar && (
              <BookingForm
                car={selectedCar}
                searchDates={searchDates}
                onSubmit={handleBookingSubmit}
                isLoading={bookCarMutation.isPending}
                t={t}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBookingForm}>
              {t('cancelButton')}
            </Button>
          </DialogActions>
        </Dialog>

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
