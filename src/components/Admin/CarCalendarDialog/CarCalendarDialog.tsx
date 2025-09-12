import React, { useEffect, useCallback, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

// Extend dayjs with plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
import { useCarBookings } from '@/hooks/useAdmin';
import { CAR_CALENDAR_DIALOG_CONST } from './CarCalendarDialog.const';
import { carCalendarDialogStyles } from './CarCalendarDialog.styles';
import {
  CarCalendarDialogProps,
  Booking,
  CurrentMonth,
  DateStatus,
} from './CarCalendarDialog.types';

export function CarCalendarDialog({
  open,
  onClose,
  car,
}: CarCalendarDialogProps) {
  const [currentMonth, setCurrentMonth] = useState<CurrentMonth>({
    month: dayjs().month(),
    year: dayjs().year(),
  });

  // Fetch bookings for the selected car using the admin hook
  const {
    data: bookingsResponse,
    isLoading,
    error,
  } = useCarBookings(car?.id || null, open);

  const getDateStatus = useCallback(
    (date: Dayjs): DateStatus => {
      if (!bookingsResponse?.bookings)
        return { status: 'available', booking: null };

      const booking = bookingsResponse.bookings.find(
        (b: Booking) =>
          date.isSameOrAfter(dayjs(b.start_date), 'day') &&
          date.isSameOrBefore(dayjs(b.end_date), 'day') &&
          b.status !== 'deleted' // Ignore deleted bookings
      );

      if (booking) {
        return {
          status: 'booked',
          booking: booking,
        };
      }
      return { status: 'available', booking: null };
    },
    [bookingsResponse?.bookings]
  );

  // Function to color calendar days
  const colorCalendarDays = useCallback(() => {
    if (!bookingsResponse?.bookings) return;

    const calendarElement = document.querySelector(
      `.${CAR_CALENDAR_DIALOG_CONST.CALENDAR_CLASS}`
    );
    if (!calendarElement) return;

    // Get current month and year from the calendar header
    const monthElement = calendarElement.querySelector(
      '.MuiPickersCalendarHeader-label'
    );
    const monthText = monthElement?.textContent;

    if (!monthText) return;

    // Parse month and year from the calendar header
    // monthText format: "October 2025" or "Октомври 2025"
    const parts = monthText.split(' ');
    const monthName = parts[0];
    const year = parseInt(parts[1]);
    const monthIndex = CAR_CALENDAR_DIALOG_CONST.MONTH_NAMES.indexOf(
      monthName as (typeof CAR_CALENDAR_DIALOG_CONST.MONTH_NAMES)[number]
    );

    if (monthIndex === -1 || isNaN(year)) return;

    // Update current month state once
    setCurrentMonth({ month: monthIndex % 12, year });

    const dayElements = calendarElement.querySelectorAll('.MuiPickersDay-root');
    dayElements.forEach((dayElement) => {
      const dayText = dayElement.textContent;
      if (dayText) {
        const dayNumber = parseInt(dayText);
        if (!isNaN(dayNumber)) {
          const date = dayjs()
            .year(year)
            .month(monthIndex % 12)
            .date(dayNumber);
          const { status } = getDateStatus(date);

          if (status === 'booked') {
            (dayElement as HTMLElement).style.backgroundColor =
              CAR_CALENDAR_DIALOG_CONST.COLORS.booked;
            (dayElement as HTMLElement).style.color = 'white';
            (dayElement as HTMLElement).style.fontWeight = 'bold';
          } else {
            (dayElement as HTMLElement).style.backgroundColor =
              CAR_CALENDAR_DIALOG_CONST.COLORS.available;
            (dayElement as HTMLElement).style.color = 'white';
            (dayElement as HTMLElement).style.fontWeight = 'bold';
          }
        }
      }
    });
  }, [bookingsResponse?.bookings, getDateStatus]);

  // Filter bookings for current month
  const currentMonthBookings =
    bookingsResponse?.bookings?.filter((booking: Booking) => {
      const startDate = dayjs(booking.start_date);
      const endDate = dayjs(booking.end_date);

      // Check if booking overlaps with current month
      const monthStart = dayjs()
        .year(currentMonth.year)
        .month(currentMonth.month)
        .startOf('month');
      const monthEnd = dayjs()
        .year(currentMonth.year)
        .month(currentMonth.month)
        .endOf('month');

      return (
        booking.status !== 'deleted' &&
        startDate.isSameOrBefore(monthEnd, 'day') &&
        endDate.isSameOrAfter(monthStart, 'day')
      );
    }) || [];

  // Add custom CSS for calendar day coloring
  useEffect(() => {
    if (!bookingsResponse?.bookings) return;

    const style = document.createElement('style');
    style.textContent = `
      .${CAR_CALENDAR_DIALOG_CONST.CALENDAR_CLASS} .MuiPickersDay-root {
        position: relative;
        pointer-events: none;
      }
    `;

    document.head.appendChild(style);

    // Wait for calendar to be rendered and then color days
    const timer = setTimeout(() => {
      colorCalendarDays();
    }, CAR_CALENDAR_DIALOG_CONST.TIMEOUT_DELAY);

    // Set up MutationObserver to watch for calendar changes
    const calendarElement = document.querySelector(
      `.${CAR_CALENDAR_DIALOG_CONST.CALENDAR_CLASS}`
    );
    if (calendarElement) {
      const observer = new MutationObserver(() => {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
          colorCalendarDays();
        }, CAR_CALENDAR_DIALOG_CONST.TIMEOUT_DELAY);
      });

      observer.observe(calendarElement, {
        childList: true,
        subtree: true,
      });

      return () => {
        clearTimeout(timer);
        observer.disconnect();
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      };
    }

    return () => {
      clearTimeout(timer);
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [bookingsResponse?.bookings, colorCalendarDays, open]);

  // Reset current month when dialog opens
  useEffect(() => {
    if (open) {
      setCurrentMonth({
        month: dayjs().month(),
        year: dayjs().year(),
      });
    }
  }, [open]);

  // Force re-render when currentMonth changes
  useEffect(() => {
    if (open && bookingsResponse?.bookings) {
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => {
        colorCalendarDays();
      }, CAR_CALENDAR_DIALOG_CONST.OBSERVER_DELAY);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentMonth, open, bookingsResponse?.bookings, colorCalendarDays]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {CAR_CALENDAR_DIALOG_CONST.TEXTS.title} {car?.brand} {car?.model}
      </DialogTitle>

      <DialogContent>
        {isLoading && (
          <Box sx={carCalendarDialogStyles.loadingContainer}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={carCalendarDialogStyles.errorAlert}>
            {CAR_CALENDAR_DIALOG_CONST.TEXTS.loadingError}
          </Alert>
        )}

        {!isLoading && !error && (
          <Box>
            {/* Calendar */}
            <Box sx={carCalendarDialogStyles.calendarSection}>
              <Typography
                variant="h6"
                sx={carCalendarDialogStyles.calendarTitle}
              >
                {CAR_CALENDAR_DIALOG_CONST.TEXTS.availabilityCalendar}
              </Typography>
              <Box sx={carCalendarDialogStyles.legendContainer}>
                <Box sx={carCalendarDialogStyles.legendItem}>
                  <Box
                    sx={{
                      ...carCalendarDialogStyles.legendColor,
                      backgroundColor:
                        CAR_CALENDAR_DIALOG_CONST.COLORS.available,
                    }}
                  />
                  <Typography variant="body2">
                    {CAR_CALENDAR_DIALOG_CONST.TEXTS.availableDates}
                  </Typography>
                </Box>
                <Box sx={carCalendarDialogStyles.legendItem}>
                  <Box
                    sx={{
                      ...carCalendarDialogStyles.legendColor,
                      backgroundColor: CAR_CALENDAR_DIALOG_CONST.COLORS.booked,
                    }}
                  />
                  <Typography variant="body2">
                    {CAR_CALENDAR_DIALOG_CONST.TEXTS.bookedDates}
                  </Typography>
                </Box>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  className={CAR_CALENDAR_DIALOG_CONST.CALENDAR_CLASS}
                  readOnly
                  sx={carCalendarDialogStyles.calendar}
                />
              </LocalizationProvider>
            </Box>

            {/* Current Month Bookings List */}
            <Box sx={carCalendarDialogStyles.bookingsSection}>
              <Typography
                variant="h6"
                sx={carCalendarDialogStyles.bookingsTitle}
              >
                <strong>{currentMonthBookings.length}</strong>{' '}
                {currentMonthBookings.length > 1
                  ? CAR_CALENDAR_DIALOG_CONST.TEXTS.bookings
                  : CAR_CALENDAR_DIALOG_CONST.TEXTS.booking}{' '}
                {CAR_CALENDAR_DIALOG_CONST.TEXTS.for}{' '}
                {dayjs()
                  .year(currentMonth.year)
                  .month(currentMonth.month)
                  .format('MMMM YYYY')}{' '}
              </Typography>

              {currentMonthBookings.length > 0 ? (
                <List>
                  {currentMonthBookings.map(
                    (booking: Booking, index: number) => (
                      <React.Fragment key={booking.id}>
                        <ListItem>
                          <Box sx={carCalendarDialogStyles.bookingItem}>
                            <Box sx={carCalendarDialogStyles.bookingHeader}>
                              <Typography variant="subtitle1">
                                {booking.customer_name}
                              </Typography>
                              <Chip
                                label={booking.status}
                                size="small"
                                color={
                                  booking.status === 'confirmed'
                                    ? 'success'
                                    : 'warning'
                                }
                              />
                            </Box>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={carCalendarDialogStyles.bookingDates}
                            >
                              {dayjs(booking.start_date).format('DD.MM.YYYY')} -{' '}
                              {dayjs(booking.end_date).format('DD.MM.YYYY')}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={carCalendarDialogStyles.bookingPeriod}
                            >
                              {CAR_CALENDAR_DIALOG_CONST.TEXTS.period}{' '}
                              {dayjs(booking.end_date).diff(
                                dayjs(booking.start_date),
                                'days'
                              ) + 1}{' '}
                              {CAR_CALENDAR_DIALOG_CONST.TEXTS.days}
                            </Typography>
                          </Box>
                        </ListItem>
                        {index < currentMonthBookings.length - 1 && <Divider />}
                      </React.Fragment>
                    )
                  )}
                </List>
              ) : (
                <Typography
                  variant="body2"
                  sx={carCalendarDialogStyles.noBookingsText}
                >
                  {CAR_CALENDAR_DIALOG_CONST.TEXTS.noBookings}
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          {CAR_CALENDAR_DIALOG_CONST.TEXTS.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
