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
import BookingEditDialog from './BookingEditDialog';
import DeleteBookingDialog from './DeleteBookingDialog';

// Currency conversion function (approximate BGN to EUR rate)
// Helper function to display EUR equivalent
const getEURDisplay = (bgnAmount: number): string => {
  const eurAmount = Math.round((bgnAmount / 1.96) * 100) / 100;
  return eurAmount.toFixed(2);
};

export default function BookingsTab() {
  // Директни български текстове за админ панела
  const texts = {
    title: 'Резервации',
    refresh: 'Обнови',
    search: 'Търсене',
    searchPlaceholder: 'Име, имейл, телефон...',
    status: 'Статус',
    allStatuses: 'Всички статуси',
    pending: 'Чакаща',
    confirmed: 'Потвърдена',
    cancelled: 'Отменена',
    depositStatus: 'Статус на депозит',
    allDepositStatuses: 'Всички депозити',
    depositPending: 'Чакащ',
    depositPaid: 'Платено',
    depositRefunded: 'Върнато',
    startDate: 'Начална дата',
    endDate: 'Крайна дата',
    clearFilters: 'Изчисти филтрите',
    car: 'Автомобил',
    client: 'Клиент',
    dates: 'Дати',
    totalPrice: 'Обща цена',
    deposit: 'Депозит',
    actions: 'Действия',
    rowsPerPage: 'Редове на страница',
    of: 'от',
    noBookings: 'Няма резервации',
    noBookingsDescription: 'Все още не са направени резервации в системата',
    carNotFound: 'Автомобилът не е намерен',
    to: 'до',
    days: 'дни',
  };

  // Помощни функции за статуси
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return texts.pending;
      case 'confirmed':
        return texts.confirmed;
      case 'cancelled':
        return texts.cancelled;
      case 'deleted':
        return 'Изтрита';
      default:
        return status;
    }
  };

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
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
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
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={400}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', sm: 'center' },
          gap: 2,
        }}
      >
        <Typography variant="h2" component="h2" color="primary">
          {texts.title}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={() => refetchBookings()}
        >
          {texts.refresh}
        </Button>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Box sx={{ minWidth: 200, flex: '1 1 200px' }}>
            <TextField
              fullWidth
              label={texts.search}
              value={filters.search}
              onChange={handleFilterChange('search')}
              placeholder={texts.searchPlaceholder}
              InputProps={{
                startAdornment: (
                  <Search sx={{ mr: 1, color: 'text.secondary' }} />
                ),
              }}
            />
          </Box>
          <Box sx={{ minWidth: 150, flex: '1 1 150px' }}>
            <FormControl fullWidth>
              <InputLabel>{texts.status}</InputLabel>
              <Select
                value={filters.status}
                onChange={handleFilterChange('status')}
                label={texts.status}
              >
                <MenuItem value="">{texts.allStatuses}</MenuItem>
                <MenuItem value="pending">{texts.pending}</MenuItem>
                <MenuItem value="confirmed">{texts.confirmed}</MenuItem>
                <MenuItem value="cancelled">{texts.cancelled}</MenuItem>
                <MenuItem value="deleted">Изтрита</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 150, flex: '1 1 150px' }}>
            <FormControl fullWidth>
              <InputLabel>{texts.depositStatus}</InputLabel>
              <Select
                value={filters.depositStatus}
                onChange={handleFilterChange('depositStatus')}
                label={texts.depositStatus}
              >
                <MenuItem value="">{texts.allDepositStatuses}</MenuItem>
                <MenuItem value="pending">{texts.depositPending}</MenuItem>
                <MenuItem value="paid">{texts.depositPaid}</MenuItem>
                <MenuItem value="refunded">{texts.depositRefunded}</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 150, flex: '1 1 150px' }}>
            <TextField
              fullWidth
              type="date"
              label={texts.startDate}
              value={filters.startDate}
              onChange={handleFilterChange('startDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={{ minWidth: 150, flex: '1 1 150px' }}>
            <TextField
              fullWidth
              type="date"
              label={texts.endDate}
              value={filters.endDate}
              onChange={handleFilterChange('endDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box sx={{ flex: '0 0 auto' }}>
            <Tooltip title={texts.clearFilters}>
              <IconButton onClick={clearFilters} color="primary">
                <FilterList />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {/* Error Alert */}
      {/* Error handling is now done through React Query */}

      {/* Bookings Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{texts.car}</TableCell>
                <TableCell>{texts.client}</TableCell>
                <TableCell>{texts.dates}</TableCell>
                <TableCell>{texts.totalPrice}</TableCell>
                <TableCell>{texts.deposit}</TableCell>
                <TableCell>{texts.status}</TableCell>
                <TableCell>Статус на депозит</TableCell>
                <TableCell>Бележки</TableCell>
                <TableCell>{texts.actions}</TableCell>
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
                      <Box>
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
                      <Box>
                        <Typography variant="body2">
                          {formatDate(booking.start_date)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {texts.to} {formatDate(booking.end_date)}
                        </Typography>
                        <br />
                        <Typography variant="caption" color="text.secondary">
                          {booking.rental_days} {texts.days}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {booking.total_price.toFixed(2)} лв
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ≈ {getEURDisplay(booking.total_price)} €
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
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
                        sx={{
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {booking.notes || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
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
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={filteredBookings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={texts.rowsPerPage}
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} ${texts.of} ${count !== -1 ? count : `>${to}`}`
          }
        />
      </Paper>

      {/* No Bookings Message */}
      {bookings && bookings.length === 0 && !isLoadingBookings && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {texts.noBookings}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {texts.noBookingsDescription}
          </Typography>
        </Box>
      )}

      {/* No Filtered Results Message */}
      {bookings &&
        bookings.length > 0 &&
        filteredBookings.length === 0 &&
        !isLoadingBookings && (
          <Box textAlign="center" py={4}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Няма резултати за избраните филтри
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Опитайте с различни критерии за търсене
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
