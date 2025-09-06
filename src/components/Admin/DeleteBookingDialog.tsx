'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import { AdminBooking } from '@/hooks/useAdmin';

interface DeleteBookingDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  booking: AdminBooking | null;
  isDeleting: boolean;
}

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('bg-BG', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export default function DeleteBookingDialog({
  open,
  onClose,
  onConfirm,
  booking,
  isDeleting,
}: DeleteBookingDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" component="span">
            Изтриване на резервация
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Сигурни ли сте, че искате да изтриете резервацията за:
        </Typography>
        {booking && (
          <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {booking.client_first_name} {booking.client_last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {booking.client_email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {booking.cars?.brand} {booking.cars?.model}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
            </Typography>
          </Box>
        )}
        <Typography
          variant="body2"
          color="error"
          sx={{ fontWeight: 'medium', mb: 2 }}
        >
          ⚠️ Това действие ще маркира резервацията като изтрита и ще отключи
          автомобила за тези дати.
        </Typography>
        <Typography variant="body2" color="info" sx={{ fontWeight: 'medium' }}>
          ⚠️ Резервацията ще продължи да бъде видима в администраторския панел,
          но ще бъде маркирана като изтрита.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" disabled={isDeleting}>
          Отказ
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={16} /> : null}
        >
          {isDeleting ? 'Изтриване...' : 'Изтрий'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
