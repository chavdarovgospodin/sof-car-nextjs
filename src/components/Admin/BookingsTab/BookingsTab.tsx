'use client';

import { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import { Search, FilterList, Refresh, Edit, Delete } from '@mui/icons-material';
import { useAdmin, AdminBooking } from '@/hooks/useAdmin';
import BookingEditDialog from '../BookingEditDialog';
import DeleteBookingDialog from '../DeleteBookingDialog';
import { BOOKINGS_TAB_CONST } from './BookingsTab.const';
import { bookingsTabStyles } from './BookingsTab.styles';
import { Filters, SnackbarState } from './BookingsTab.types';

// Currency conversion function (approximate BGN to EUR rate)
// Helper function to display EUR equivalent
const getEURDisplay = (bgnAmount: number): string => {
  const eurAmount =
    Math.round((bgnAmount / BOOKINGS_TAB_CONST.CURRENCY_RATE) * 100) / 100;
  return eurAmount.toFixed(2);
};

export default function BookingsTab() {
  const {
    bookings,
    isLoadingBookings,
    refetchBookings,
    updateBooking,
    deleteBooking,
    isUpdatingBooking,
    isDeletingBooking,
  } = useAdmin();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(
    BOOKINGS_TAB_CONST.DEFAULT_ROWS_PER_PAGE
  );
  const [filters, setFilters] = useState<Filters>({
    status: '',
    depositStatus: '',
    search: '',
    startDate: '',
    endDate: '',
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(
    null
  );
  const [bookingToDelete, setBookingToDelete] = useState<AdminBooking | null>(
    null
  );
  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: '',
    severity: 'info',
  });

  // Помощни функции за статуси
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return BOOKINGS_TAB_CONST.TEXTS.pending;
      case 'confirmed':
        return BOOKINGS_TAB_CONST.TEXTS.confirmed;
      case 'cancelled':
        return BOOKINGS_TAB_CONST.TEXTS.cancelled;
      case 'deleted':
        return BOOKINGS_TAB_CONST.TEXTS.deleted;
      default:
        return status;
    }
  };

  // Client-side filtering function
  const getFilteredBookings = () => {
    if (!bookings) return [];

    return bookings.filter((booking: AdminBooking) => {
      // Status filter
      if (filters.status && booking.status !== filters.status) {
        return false;
      }

      // Deposit status filter
      if (
        filters.depositStatus &&
        booking.deposit_status !== filters.depositStatus
      ) {
        return false;
      }

      // Search filter (name, email, phone)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const fullName =
          `${booking.client_first_name} ${booking.client_last_name}`.toLowerCase();
        const email = booking.client_email.toLowerCase();
        const phone = booking.client_phone.toLowerCase();

        if (
          !fullName.includes(searchTerm) &&
          !email.includes(searchTerm) &&
          !phone.includes(searchTerm)
        ) {
          return false;
        }
      }

      // Date range filter
      if (filters.startDate || filters.endDate) {
        const bookingStartDate = new Date(booking.start_date);
        const bookingEndDate = new Date(booking.end_date);

        if (filters.startDate) {
          const filterStartDate = new Date(filters.startDate);
          if (bookingEndDate < filterStartDate) {
            return false;
          }
        }

        if (filters.endDate) {
          const filterEndDate = new Date(filters.endDate);
          if (bookingStartDate > filterEndDate) {
            return false;
          }
        }
      }

      return true;
    });
  };

  const filteredBookings = getFilteredBookings();

  const handleFilterChange =
    (field: string) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | { target: { value: string; name: string } }
    ) => {
      setFilters((prev) => ({ ...prev, [field]: event.target.value }));
      setPage(0); // Reset to first page when filters change
    };

  const clearFilters = () => {
    setFilters({
      status: '',
      depositStatus: '',
      search: '',
      startDate: '',
      endDate: '',
    });
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditBooking = (booking: AdminBooking) => {
    setSelectedBooking(booking);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleSaveBooking = (data: {
    status?: string;
    deposit_status?: string;
    notes?: string;
  }) => {
    if (selectedBooking) {
      updateBooking(
        { id: selectedBooking.id, data },
        {
          onSuccess: () => {
            handleCloseEditDialog();
          },
          onError: (error: unknown) => {
            console.error('Failed to update booking:', error);

            // Check if it's a 401 error (session expired) - but not for logout
            if (
              error &&
              typeof error === 'object' &&
              'response' in error &&
              error.response &&
              typeof error.response === 'object' &&
              'status' in error.response &&
              error.response.status === 401 &&
              !(error as { config?: { url?: string } }).config?.url?.includes(
                '/admin/logout'
              )
            ) {
              // Show session expired message and redirect to login
              showSnackbar(
                'Сесията ви е изтекла. Моля, влезте отново в системата.',
                'warning'
              );
              // Redirect to login page
              setTimeout(() => {
                window.location.href = '/admin/login';
              }, 2000);
            } else {
              // Show generic error message
              showSnackbar(
                'Грешка при обновяване на резервацията. Моля, опитайте отново.',
                'error'
              );
            }
          },
        }
      );
    }
  };

  const handleDeleteBooking = (booking: AdminBooking) => {
    setBookingToDelete(booking);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (bookingToDelete) {
      deleteBooking(bookingToDelete.id, {
        onSuccess: () => {
          // Success handled by optimistic update
          setDeleteDialogOpen(false);
          setBookingToDelete(null);
        },
        onError: (error: unknown) => {
          console.error('Failed to delete booking:', error);

          // Check if it's a 401 error (session expired) - but not for logout
          if (
            error &&
            typeof error === 'object' &&
            'response' in error &&
            (error as { response?: { status?: number } }).response?.status ===
              401 &&
            !(error as { config?: { url?: string } }).config?.url?.includes(
              '/admin/logout'
            )
          ) {
            // Redirect to login page
            showSnackbar(
              'Сесията ви е изтекла. Моля, влезте отново в системата.',
              'warning'
            );
            setTimeout(() => {
              window.location.href = '/admin/login';
            }, 2000);
          } else {
            // Show generic error message
            showSnackbar(
              'Грешка при изтриване на резервацията. Моля, опитайте отново.',
              'error'
            );
          }
        },
      });
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setBookingToDelete(null);
  };

  const showSnackbar = (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      case 'completed':
        return 'info';
      case 'deleted':
        return 'default';
      default:
        return 'default';
    }
  };

  const getDepositStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Чакащ';
      case 'paid':
        return 'Платен';
      case 'refunded':
        return 'Върнат';
      default:
        return status;
    }
  };

  const getDepositStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'refunded':
        return 'info';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bg-BG');
  };

  if (isLoadingBookings) {
    return (
      <Box sx={bookingsTabStyles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={bookingsTabStyles.header}>
        <Typography variant="h2" component="h2" color="primary">
          {BOOKINGS_TAB_CONST.TEXTS.title}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={() => refetchBookings()}
        >
          {BOOKINGS_TAB_CONST.TEXTS.refresh}
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={bookingsTabStyles.filtersPaper}>
        <Box sx={bookingsTabStyles.filtersContainer}>
          <Box sx={bookingsTabStyles.filterField}>
            <TextField
              fullWidth
              label={BOOKINGS_TAB_CONST.TEXTS.search}
              value={filters.search}
              onChange={handleFilterChange('search')}
              placeholder={BOOKINGS_TAB_CONST.TEXTS.searchPlaceholder}
              InputProps={{
                startAdornment: (
                  <Search sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Box>
          <Box sx={bookingsTabStyles.filterFieldSmall}>
            <FormControl fullWidth>
              <InputLabel>{BOOKINGS_TAB_CONST.TEXTS.status}</InputLabel>
              <Select
                value={filters.status}
                onChange={handleFilterChange('status')}
                label={BOOKINGS_TAB_CONST.TEXTS.status}
              >
                {BOOKINGS_TAB_CONST.STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={bookingsTabStyles.filterFieldSmall}>
            <FormControl fullWidth>
              <InputLabel>{BOOKINGS_TAB_CONST.TEXTS.depositStatus}</InputLabel>
              <Select
                value={filters.depositStatus}
                onChange={handleFilterChange('depositStatus')}
                label={BOOKINGS_TAB_CONST.TEXTS.depositStatus}
              >
                {BOOKINGS_TAB_CONST.DEPOSIT_STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={bookingsTabStyles.filterFieldSmall}>
            <TextField
              fullWidth
              type="date"
              label={BOOKINGS_TAB_CONST.TEXTS.startDate}
              value={filters.startDate}
              onChange={handleFilterChange('startDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={bookingsTabStyles.filterFieldSmall}>
            <TextField
              fullWidth
              type="date"
              label={BOOKINGS_TAB_CONST.TEXTS.endDate}
              value={filters.endDate}
              onChange={handleFilterChange('endDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={bookingsTabStyles.clearFiltersButton}>
            <Tooltip title={BOOKINGS_TAB_CONST.TEXTS.clearFilters}>
              <IconButton onClick={clearFilters} color="primary">
                <FilterList />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {/* Bookings Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{BOOKINGS_TAB_CONST.TEXTS.car}</TableCell>
                <TableCell>{BOOKINGS_TAB_CONST.TEXTS.client}</TableCell>
                <TableCell>{BOOKINGS_TAB_CONST.TEXTS.dates}</TableCell>
                <TableCell>{BOOKINGS_TAB_CONST.TEXTS.totalPrice}</TableCell>
                <TableCell>{BOOKINGS_TAB_CONST.TEXTS.deposit}</TableCell>
                <TableCell>{BOOKINGS_TAB_CONST.TEXTS.status}</TableCell>
                <TableCell>Статус на депозит</TableCell>
                <TableCell>Бележки</TableCell>
                <TableCell>{BOOKINGS_TAB_CONST.TEXTS.actions}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBookings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((booking: AdminBooking) => (
                  <TableRow key={booking.id} hover>
                    <TableCell>
                      <Typography variant="body2">
                        {booking.cars?.brand || '-'}{' '}
                        {booking.cars?.model || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={bookingsTabStyles.clientCell}>
                        <Typography variant="body2" fontWeight="medium">
                          {booking.client_first_name}
                        </Typography>
                        <Typography variant="body2" fontWeight="medium">
                          {booking.client_last_name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {booking.client_email}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="text.secondary">
                          {booking.client_phone}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={bookingsTabStyles.datesCell}>
                        <Typography variant="body2">
                          {formatDate(booking.start_date)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {BOOKINGS_TAB_CONST.TEXTS.to}{' '}
                          {formatDate(booking.end_date)}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="text.secondary">
                          {booking.rental_days} {BOOKINGS_TAB_CONST.TEXTS.days}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={bookingsTabStyles.priceCell}>
                        <Typography variant="body2" fontWeight="medium">
                          {booking.total_price.toFixed(2)} лв
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ≈ {getEURDisplay(booking.total_price)} €
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={bookingsTabStyles.depositCell}>
                        <Typography variant="body2" fontWeight="medium">
                          {booking.deposit_amount.toFixed(2)} лв
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ≈ {getEURDisplay(booking.deposit_amount)} €
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(booking.status)}
                        color={
                          getStatusColor(booking.status) as
                            | 'success'
                            | 'warning'
                            | 'error'
                            | 'info'
                            | 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getDepositStatusText(booking.deposit_status)}
                        color={
                          getDepositStatusColor(booking.deposit_status) as
                            | 'success'
                            | 'warning'
                            | 'info'
                            | 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={bookingsTabStyles.notesCell}
                      >
                        {booking.notes || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={bookingsTabStyles.actionsCell}>
                        <>
                          <Tooltip title="Редактиране">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEditBooking(booking)}
                              disabled={booking.status === 'deleted'}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Изтриване">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDeleteBooking(booking)}
                              disabled={booking.status === 'deleted'}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </>
                        {booking.status === 'deleted' && (
                          <Typography variant="caption" color="text.secondary">
                            Изтрита
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={BOOKINGS_TAB_CONST.ROWS_PER_PAGE_OPTIONS}
          component="div"
          count={filteredBookings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={BOOKINGS_TAB_CONST.TEXTS.rowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} ${BOOKINGS_TAB_CONST.TEXTS.of} ${
              count !== -1 ? count : `>${to}`
            }`
          }
        />
      </Paper>

      {/* No Bookings Message */}
      {bookings && bookings.length === 0 && !isLoadingBookings && (
        <Box sx={bookingsTabStyles.noBookingsContainer}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {BOOKINGS_TAB_CONST.TEXTS.noBookings}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {BOOKINGS_TAB_CONST.TEXTS.noBookingsDescription}
          </Typography>
        </Box>
      )}

      {/* No Filtered Results Message */}
      {bookings &&
        bookings.length > 0 &&
        filteredBookings.length === 0 &&
        !isLoadingBookings && (
          <Box sx={bookingsTabStyles.noFilteredResultsContainer}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {BOOKINGS_TAB_CONST.TEXTS.noFilteredResults}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {BOOKINGS_TAB_CONST.TEXTS.noFilteredResultsDescription}
            </Typography>
          </Box>
        )}

      {/* Edit Dialog */}
      <BookingEditDialog
        open={editDialogOpen}
        onClose={handleCloseEditDialog}
        booking={selectedBooking}
        onSave={handleSaveBooking}
        isSaving={isUpdatingBooking}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteBookingDialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        booking={bookingToDelete}
        isDeleting={isDeletingBooking}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={bookingsTabStyles.snackbar.anchorOrigin}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
