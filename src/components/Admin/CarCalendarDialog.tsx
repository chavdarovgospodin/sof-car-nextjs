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
import { AdminCar, useCarBookings } from '../../hooks/useAdmin';

interface CarCalendarDialogProps {
  open: boolean;
  onClose: () => void;
  car: AdminCar | null;
}

interface Booking {
  id: string;
  start_date: string;
  end_date: string;
  customer_name: string;
  status: string;
}

export function CarCalendarDialog({
  open,
  onClose,
  car,
}: CarCalendarDialogProps) {
  const [currentMonth, setCurrentMonth] = useState<{
    month: number;
    year: number;
  }>({
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
    (date: Dayjs) => {
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

    const calendarElement = document.querySelector('.car-calendar');
    if (!calendarElement) return;

    // Get current month and year from the calendar header
    const monthElement = calendarElement.querySelector(
      '.MuiPickersCalendarHeader-label'
    );
    const monthText = monthElement?.textContent;

    if (!monthText) return;

    // Parse month and year from the calendar header
    // monthText format: "October 2025" or "Октомври 2025"
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
      'Януари',
      'Февруари',
      'Март',
      'Април',
      'Май',
      'Юни',
      'Юли',
      'Август',
      'Септември',
      'Октомври',
      'Ноември',
      'Декември',
    ];

    const parts = monthText.split(' ');
    const monthName = parts[0];
    const year = parseInt(parts[1]);
    const monthIndex = monthNames.indexOf(monthName);

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
            (dayElement as HTMLElement).style.backgroundColor = '#f44336';
            (dayElement as HTMLElement).style.color = 'white';
            (dayElement as HTMLElement).style.fontWeight = 'bold';
          } else {
            (dayElement as HTMLElement).style.backgroundColor = '#4caf50';
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
      .car-calendar .MuiPickersDay-root {
        position: relative;
        pointer-events: none;
      }
    `;

    document.head.appendChild(style);

    // Wait for calendar to be rendered and then color days
    const timer = setTimeout(() => {
      colorCalendarDays();
    }, 100);

    // Set up MutationObserver to watch for calendar changes
    const calendarElement = document.querySelector('.car-calendar');
    if (calendarElement) {
      const observer = new MutationObserver(() => {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
          colorCalendarDays();
        }, 100);
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
      }, 50);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [currentMonth, open, bookingsResponse?.bookings, colorCalendarDays]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Календар за {car?.brand} {car?.model}
      </DialogTitle>

      <DialogContent>
        {isLoading && (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Грешка при зареждане на резервациите
          </Alert>
        )}

        {!isLoading && !error && (
          <Box>
            {/* Calendar */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Календар на наличност
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: '#4caf50',
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="body2">Свободни дати</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: '#f44336',
                      borderRadius: 1,
                    }}
                  />
                  <Typography variant="body2">Запазени дати</Typography>
                </Box>
              </Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  className="car-calendar"
                  readOnly
                  sx={{
                    '& .MuiPickersDay-root': {
                      '&.Mui-selected': {
                        backgroundColor: 'transparent',
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Box>

            {/* Current Month Bookings List */}
            <Box>
              <Typography variant="h6" gutterBottom>
                <strong>{currentMonthBookings.length}</strong>{' '}
                {currentMonthBookings.length > 1 ? 'Резервации' : 'Резервация'}{' '}
                за{' '}
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
                          <Box sx={{ width: '100%' }}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 1,
                              }}
                            >
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
                              sx={{ mb: 0.5 }}
                            >
                              {dayjs(booking.start_date).format('DD.MM.YYYY')} -{' '}
                              {dayjs(booking.end_date).format('DD.MM.YYYY')}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Период:{' '}
                              {dayjs(booking.end_date).diff(
                                dayjs(booking.start_date),
                                'days'
                              ) + 1}{' '}
                              дни
                            </Typography>
                          </Box>
                        </ListItem>
                        {index < currentMonthBookings.length - 1 && <Divider />}
                      </React.Fragment>
                    )
                  )}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Няма резервации за този автомобил.
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Затвори</Button>
      </DialogActions>
    </Dialog>
  );
}
