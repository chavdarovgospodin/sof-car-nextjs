'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
// import { AdminBooking } from '@/hooks/useAdmin';
import { BOOKING_EDIT_DIALOG_CONST } from './BookingEditDialog.const';
import { bookingEditDialogStyles } from './BookingEditDialog.styles';
import { BookingEditDialogProps, FormData } from './BookingEditDialog.types';

export default function BookingEditDialog({
  open,
  onClose,
  booking,
  onSave,
  isSaving,
}: BookingEditDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    status: '',
    deposit_status: '',
    notes: '',
  });

  // Update form data when booking changes
  useEffect(() => {
    if (booking) {
      setFormData({
        status: booking.status || '',
        deposit_status: booking.deposit_status || '',
        notes: booking.notes || '',
      });
    }
  }, [booking]);

  const handleChange =
    (field: string) => (event: { target: { value: string } }) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSave = () => {
    onSave(formData);
  };

  const handleClose = () => {
    if (!isSaving) {
      onClose();
    }
  };

  if (!booking) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableScrollLock={true}
      keepMounted={false}
      sx={{
        '& .MuiDialog-paper': {
          margin: 2,
          maxHeight: 'calc(100vh - 32px)',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div">
          {BOOKING_EDIT_DIALOG_CONST.TEXTS.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Резервация #{booking.id.slice(0, 8).toUpperCase()}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 1 }}>
          {/* Client Info */}
          <Box sx={bookingEditDialogStyles.clientInfoBox}>
            <Typography variant="subtitle2" gutterBottom>
              {BOOKING_EDIT_DIALOG_CONST.TEXTS.clientInfo}
            </Typography>
            <Typography variant="body2">
              {booking.client_first_name} {booking.client_last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {booking.client_email} • {booking.client_phone}
            </Typography>
          </Box>

          {/* Car Info */}
          <Box sx={bookingEditDialogStyles.carInfoBox}>
            <Typography variant="subtitle2" gutterBottom>
              {BOOKING_EDIT_DIALOG_CONST.TEXTS.car}
            </Typography>
            <Typography variant="body2">
              {booking.cars?.brand} {booking.cars?.model} ({booking.cars?.year})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(booking.start_date).toLocaleDateString('bg-BG')} -{' '}
              {new Date(booking.end_date).toLocaleDateString('bg-BG')} (
              {booking.rental_days} дни)
            </Typography>
          </Box>

          {/* Form Fields */}
          <Box sx={bookingEditDialogStyles.formFieldsContainer}>
            {/* Status */}
            <FormControl fullWidth>
              <InputLabel>{BOOKING_EDIT_DIALOG_CONST.TEXTS.status}</InputLabel>
              <Select
                value={formData.status}
                onChange={handleChange('status')}
                label={BOOKING_EDIT_DIALOG_CONST.TEXTS.status}
                disabled={isSaving}
              >
                {BOOKING_EDIT_DIALOG_CONST.STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Deposit Status */}
            <FormControl fullWidth>
              <InputLabel>
                {BOOKING_EDIT_DIALOG_CONST.TEXTS.depositStatus}
              </InputLabel>
              <Select
                value={formData.deposit_status}
                onChange={handleChange('deposit_status')}
                label={BOOKING_EDIT_DIALOG_CONST.TEXTS.depositStatus}
                disabled={isSaving}
              >
                {BOOKING_EDIT_DIALOG_CONST.DEPOSIT_STATUS_OPTIONS.map(
                  (option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            {/* Notes */}
            <TextField
              fullWidth
              multiline
              rows={4}
              label={BOOKING_EDIT_DIALOG_CONST.TEXTS.notes}
              value={formData.notes}
              onChange={handleChange('notes')}
              placeholder={BOOKING_EDIT_DIALOG_CONST.TEXTS.notesPlaceholder}
              disabled={isSaving}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={bookingEditDialogStyles.dialogActions}>
        <Button onClick={handleClose} disabled={isSaving}>
          {BOOKING_EDIT_DIALOG_CONST.TEXTS.cancel}
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={isSaving}
          startIcon={isSaving ? <CircularProgress size={20} /> : null}
        >
          {isSaving
            ? BOOKING_EDIT_DIALOG_CONST.TEXTS.saving
            : BOOKING_EDIT_DIALOG_CONST.TEXTS.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
