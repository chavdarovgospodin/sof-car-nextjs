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
// import { AdminBooking } from '@/hooks/useAdmin';
import { DELETE_BOOKING_DIALOG_CONST } from './DeleteBookingDialog.const';
import { deleteBookingDialogStyles } from './DeleteBookingDialog.styles';
import { DeleteBookingDialogProps } from './DeleteBookingDialog.types';

// Helper function to format dates
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(
    DELETE_BOOKING_DIALOG_CONST.LOCALE,
    DELETE_BOOKING_DIALOG_CONST.DATE_FORMAT_OPTIONS
  );
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
      <DialogTitle sx={deleteBookingDialogStyles.dialogTitle}>
        <Box sx={deleteBookingDialogStyles.titleContainer}>
          <Typography variant="h6" component="span">
            {DELETE_BOOKING_DIALOG_CONST.TEXTS.title}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography
          variant="body1"
          sx={deleteBookingDialogStyles.confirmMessage}
        >
          {DELETE_BOOKING_DIALOG_CONST.TEXTS.confirmMessage}
        </Typography>
        {booking && (
          <Box sx={deleteBookingDialogStyles.bookingInfo}>
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
          sx={deleteBookingDialogStyles.warningMessage}
        >
          {DELETE_BOOKING_DIALOG_CONST.TEXTS.warningMessage}
        </Typography>
        <Typography
          variant="body2"
          color="info"
          sx={deleteBookingDialogStyles.infoMessage}
        >
          {DELETE_BOOKING_DIALOG_CONST.TEXTS.infoMessage}
        </Typography>
      </DialogContent>
      <DialogActions sx={deleteBookingDialogStyles.dialogActions}>
        <Button onClick={onClose} variant="outlined" disabled={isDeleting}>
          {DELETE_BOOKING_DIALOG_CONST.TEXTS.cancel}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={16} /> : null}
        >
          {isDeleting
            ? DELETE_BOOKING_DIALOG_CONST.TEXTS.deleting
            : DELETE_BOOKING_DIALOG_CONST.TEXTS.delete}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
