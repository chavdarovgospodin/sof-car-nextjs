export const BOOKING_PAGE_CLIENT_CONST = {
  TEXTS: {
    errorSearchingCars: 'booking.errorSearchingCars',
    selectDatesMessage: 'booking.selectDatesMessage',
    foundCars: 'booking.foundCars',
    forPeriod: 'booking.forPeriod',
    noCarsFound: 'booking.noCarsFound',
    developmentBannerTitle: 'booking.developmentBannerTitle',
    developmentBannerMessage: 'booking.developmentBannerMessage',
  },
  STYLES: {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      paddingY: 4,
    },
    selectDatesContainer: {
      textAlign: 'center',
      padding: 4,
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      padding: 4,
    },
    carsContainer: {
      marginBottom: 3,
    },
    noCarsContainer: {
      textAlign: 'center',
      padding: 4,
    },
    developmentBanner: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      borderRadius: 0,
      boxShadow: 3,
    },
    developmentBannerMessage: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    developmentBannerContent: {
      textAlign: 'center',
      py: 1,
    },
  },
  DEFAULT_TIME: {
    hour: 9,
    minute: 0,
    second: 0,
    millisecond: 0,
  },
  GRID_SPACING: 3,
  CIRCULAR_PROGRESS_SIZE: 60,
  SNACKBAR_DURATION: 6000,
  SNACKBAR_ANCHOR: {
    vertical: 'top',
    horizontal: 'center',
  },
} as const;
