'use client';

import { useState, useEffect } from 'react';
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
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { Search, FilterList, Refresh, Visibility } from '@mui/icons-material';
import { useAdmin, AdminBooking } from '@/hooks/useAdmin';

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
    startDate: 'Начална дата',
    endDate: 'Крайна дата',
    clearFilters: 'Изчисти филтрите',
    reference: 'Референция',
    car: 'Автомобил',
    client: 'Клиент',
    dates: 'Дати',
    totalPrice: 'Обща цена',
    deposit: 'Депозит',
    actions: 'Действия',
    viewDetails: 'Преглед на детайлите',
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
      default:
        return status;
    }
  };

  const getDepositStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Чакащ';
      case 'paid':
        return 'Платено';
      case 'refunded':
        return 'Върнато';
      default:
        return status;
    }
  };

  const { bookings, isLoadingBookings, refetchBookings } = useAdmin();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    // Refetch bookings when filters change
    refetchBookings();
  }, [filters, refetchBookings]);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
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

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} €`;
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
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" component="h2">
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
              <IconButton
                onClick={() =>
                  setFilters({
                    status: '',
                    search: '',
                    startDate: '',
                    endDate: '',
                  })
                }
                color="primary"
              >
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
                <TableCell>{texts.reference}</TableCell>
                <TableCell>{texts.car}</TableCell>
                <TableCell>{texts.client}</TableCell>
                <TableCell>{texts.dates}</TableCell>
                <TableCell>{texts.totalPrice}</TableCell>
                <TableCell>{texts.status}</TableCell>
                <TableCell>{texts.deposit}</TableCell>
                <TableCell>{texts.actions}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((booking: AdminBooking) => (
                  <TableRow key={booking.id} hover>
                    <TableCell>
                      <Typography variant="body2" fontFamily="monospace">
                        {booking.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {booking.cars?.brand || '-'} {booking.cars?.model || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {booking.client_name}
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
                          {Math.ceil(
                            (new Date(booking.end_date).getTime() -
                              new Date(booking.start_date).getTime()) /
                              (1000 * 60 * 60 * 24)
                          )}{' '}
                          {texts.days}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {formatPrice(booking.total_price)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(booking.status)}
                        color={
                          getStatusColor(booking.status) as
                            | 'success'
                            | 'warning'
                            | 'error'
                            | 'default'
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        -
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title={texts.viewDetails}>
                        <IconButton size="small" color="primary">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
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
          count={bookings?.length || 0}
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
    </Box>
  );
}
