import { SxProps, Theme } from '@mui/material';

export const carCalendarDialogStyles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    p: 3,
  } as SxProps<Theme>,
  errorAlert: {
    mb: 2,
  } as SxProps<Theme>,
  calendarSection: {
    mb: 3,
  } as SxProps<Theme>,
  calendarTitle: {
    mb: 2,
  } as SxProps<Theme>,
  legendContainer: {
    display: 'flex',
    gap: 2,
    mb: 2,
  } as SxProps<Theme>,
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,
  legendColor: {
    width: 20,
    height: 20,
    borderRadius: 1,
  } as SxProps<Theme>,
  calendar: {
    '& .MuiPickersDay-root': {
      '&.Mui-selected': {
        backgroundColor: 'transparent',
      },
    },
  } as SxProps<Theme>,
  bookingsSection: {
    // No specific styles needed
  } as SxProps<Theme>,
  bookingsTitle: {
    mb: 2,
  } as SxProps<Theme>,
  bookingItem: {
    width: '100%',
  } as SxProps<Theme>,
  bookingHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1,
  } as SxProps<Theme>,
  bookingDates: {
    mb: 0.5,
  } as SxProps<Theme>,
  bookingPeriod: {
    // No specific styles needed
  } as SxProps<Theme>,
  noBookingsText: {
    color: 'text.secondary',
  } as SxProps<Theme>,
} as const;
