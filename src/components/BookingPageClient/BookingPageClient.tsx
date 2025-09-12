'use client';

import React, { useState, Suspense } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  // Snackbar, // commented for development
} from '@mui/material';
import { DateSearch } from '../DateSearch';
import { CarCard } from '../CarCard/CarCard';
import type { CarData } from '../../types/api';
import { useCars, useCreateBooking } from '../../hooks/useApi';
import { BookingForm } from '../BookingForm';
import { useTranslations } from '../../hooks/useTranslations';
import { useBreakpoint } from '../../providers';
import { BOOKING_PAGE_CLIENT_CONST } from './BookingPageClient.const';
import { bookingPageClientStyles } from './BookingPageClient.styles';
import {
  BookingPageClientProps,
  SearchDates,
  SnackbarState,
  BookingFormData,
} from './BookingPageClient.types';

export default function BookingPageClient({ lang }: BookingPageClientProps) {
  const { t, currentLang } = useTranslations();
  const { isSmallMobile } = useBreakpoint();
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchDates, setSearchDates] = useState<SearchDates>(() => {
    // Дефолтен час 9:00 сутринта
    const getDefaultTime = (date: Date): Date => {
      const defaultDate = new Date(date);
      defaultDate.setHours(
        BOOKING_PAGE_CLIENT_CONST.DEFAULT_TIME.hour,
        BOOKING_PAGE_CLIENT_CONST.DEFAULT_TIME.minute,
        BOOKING_PAGE_CLIENT_CONST.DEFAULT_TIME.second,
        BOOKING_PAGE_CLIENT_CONST.DEFAULT_TIME.millisecond
      );
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
  const [showDevelopmentBanner, setShowDevelopmentBanner] = useState(false);

  // Snackbar state (commented for development)
  // const [snackbar, setSnackbar] = useState<SnackbarState>({
  //   open: false,
  //   message: '',
  //   severity: 'success',
  // });

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
      image_urls: car.image_urls,
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

  const handleBookingSubmit = async (formData: BookingFormData) => {
    if (!selectedCar || !searchDates.start || !searchDates.end) return;

    setShowDevelopmentBanner(true);
    // try {
    //   const bookingData = {
    //     carId: selectedCar.id,
    //     startDate: searchDates.start.toISOString().split('T')[0],
    //     endDate: searchDates.end.toISOString().split('T')[0],
    //     ...formData,
    //   };

    //   const result = await bookCarMutation.mutateAsync({
    //     car_id: selectedCar.id,
    //     start_date: searchDates.start.toISOString().split('T')[0],
    //     end_date: searchDates.end.toISOString().split('T')[0],
    //     client_first_name: formData.clientFirstName,
    //     client_last_name: formData.clientLastName,
    //     client_email: formData.clientEmail,
    //     client_phone: formData.clientPhone,
    //     payment_method: formData.paymentMethod as
    //       | 'cash'
    //       | 'card'
    //       | 'bank_transfer',
    //   });

    //   if (result) {
    //     setSnackbar({
    //       open: true,
    //       message:
    //         lang === 'en'
    //           ? 'Car booked successfully!'
    //           : 'Автомобилът е запазен успешно!',
    //       severity: 'success',
    //     });

    //     // Затваряме формата и обновяваме данните
    //     handleCloseBookingForm();
    //     refetch(); // Обновяваме списъка с налични автомобили
    //   }
    // } catch (err) {
    //   setSnackbar({
    //     open: true,
    //     message: err instanceof Error ? err.message : 'Error booking car',
    //     severity: 'error',
    //   });
    //   console.error('Error booking car:', err);
    // }
  };

  const handleCloseDevelopmentBanner = () => {
    setShowDevelopmentBanner(false);
  };

  // Snackbar functions (commented for development)
  // const handleCloseSnackbar = () => {
  //   setSnackbar((prev) => ({ ...prev, open: false }));
  // };

  return (
    <Box sx={bookingPageClientStyles.container}>
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
            {t(BOOKING_PAGE_CLIENT_CONST.TEXTS.errorSearchingCars)}
          </Alert>
        )}

        {!shouldSearch ? (
          <Box sx={bookingPageClientStyles.selectDatesContainer}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ marginBottom: 2 }}
            >
              {t(BOOKING_PAGE_CLIENT_CONST.TEXTS.selectDatesMessage)}
            </Typography>
          </Box>
        ) : isLoading ? (
          <Box sx={bookingPageClientStyles.loadingContainer}>
            <CircularProgress
              size={BOOKING_PAGE_CLIENT_CONST.CIRCULAR_PROGRESS_SIZE}
            />
          </Box>
        ) : filteredCars.length > 0 ? (
          <>
            <Box sx={bookingPageClientStyles.carsContainer}>
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                {t(BOOKING_PAGE_CLIENT_CONST.TEXTS.foundCars, {
                  count: filteredCars.length,
                })}
                {searchDates.start && searchDates.end && (
                  <Box
                    component="span"
                    sx={
                      isSmallMobile
                        ? bookingPageClientStyles.periodContainerMobile
                        : bookingPageClientStyles.periodContainer
                    }
                  >
                    <Typography
                      component="span"
                      sx={bookingPageClientStyles.periodLabel}
                    >
                      {t(BOOKING_PAGE_CLIENT_CONST.TEXTS.forPeriod)}
                    </Typography>
                    <Box>
                      <Box
                        sx={
                          isSmallMobile
                            ? bookingPageClientStyles.dateContainerMobile
                            : bookingPageClientStyles.dateContainer
                        }
                      >
                        <Typography
                          variant="body2"
                          sx={
                            isSmallMobile
                              ? bookingPageClientStyles.dateTextMobile
                              : bookingPageClientStyles.dateText
                          }
                        >
                          {searchDates.start.toLocaleDateString(
                            currentLang === 'en' ? 'en-US' : 'bg-BG'
                          )}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={
                            isSmallMobile
                              ? bookingPageClientStyles.timeTextMobile
                              : bookingPageClientStyles.timeText
                          }
                        >
                          {searchDates.start.toLocaleTimeString(
                            currentLang === 'en' ? 'en-US' : 'bg-BG',
                            { hour: '2-digit', minute: '2-digit' }
                          )}
                        </Typography>
                        <Typography
                          component="span"
                          sx={bookingPageClientStyles.separator}
                        >
                          -
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={
                            isSmallMobile
                              ? bookingPageClientStyles.dateTextMobile
                              : bookingPageClientStyles.dateText
                          }
                        >
                          {searchDates.end.toLocaleDateString(
                            currentLang === 'en' ? 'en-US' : 'bg-BG'
                          )}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={
                            isSmallMobile
                              ? bookingPageClientStyles.timeTextMobile
                              : bookingPageClientStyles.timeText
                          }
                        >
                          {searchDates.end.toLocaleTimeString(
                            currentLang === 'en' ? 'en-US' : 'bg-BG',
                            { hour: '2-digit', minute: '2-digit' }
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Typography>
            </Box>

            <Grid container spacing={BOOKING_PAGE_CLIENT_CONST.GRID_SPACING}>
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
          <Box sx={bookingPageClientStyles.noCarsContainer}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ marginBottom: 2 }}
            >
              {t(BOOKING_PAGE_CLIENT_CONST.TEXTS.noCarsFound)}
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

        {/* Snackbar (commented for development) */}
        {/* <Snackbar
          open={snackbar.open}
          autoHideDuration={BOOKING_PAGE_CLIENT_CONST.SNACKBAR_DURATION}
          onClose={handleCloseSnackbar}
          anchorOrigin={BOOKING_PAGE_CLIENT_CONST.SNACKBAR_ANCHOR}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar> */}

        {/* Development Banner */}
        {showDevelopmentBanner && (
          <Alert
            severity="warning"
            onClose={handleCloseDevelopmentBanner}
            sx={bookingPageClientStyles.developmentBanner}
          >
            <Box sx={bookingPageClientStyles.developmentBannerContent}>
              <Typography variant="h6" component="div" gutterBottom>
                {t(BOOKING_PAGE_CLIENT_CONST.TEXTS.developmentBannerTitle)}
              </Typography>
              <Typography variant="body1">
                {t(BOOKING_PAGE_CLIENT_CONST.TEXTS.developmentBannerMessage)}
              </Typography>
            </Box>
          </Alert>
        )}
      </Container>
    </Box>
  );
}
