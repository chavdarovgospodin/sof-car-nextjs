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
import { AdminBooking } from '@/hooks/useAdmin';

interface BookingEditDialogProps {
  open: boolean;
  onClose: () => void;
  booking: AdminBooking | null;
  onSave: (data: {
    status?: string;
    deposit_status?: string;
    notes?: string;
  }) => void;
  isSaving: boolean;
}

export default function BookingEditDialog({
  open,
  onClose,
  booking,
  onSave,
  isSaving,
}: BookingEditDialogProps) {
  const [formData, setFormData] = useState({
    status: '',
    deposit_status: '',
    notes: '',
  });

  // Български текстове
  const texts = {
    title: 'Редактиране на резервация',
    status: 'Статус',
    depositStatus: 'Статус на депозит',
    notes: 'Бележки',
    notesPlaceholder: 'Въведете бележки за резервацията...',
    cancel: 'Отказ',
    save: 'Запази',
    saving: 'Запазване...',
    pending: 'Чакаща',
    confirmed: 'Потвърдена',
    cancelled: 'Отменена',
    completed: 'Завършена',
    depositPending: 'Чакащ',
    depositPaid: 'Платен',
    depositRefunded: 'Върнат',
    required: 'Задължително поле',
  };

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
          {texts.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Резервация #{booking.id.slice(0, 8).toUpperCase()}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 1 }}>
          {/* Client Info */}
          <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Информация за клиента
            </Typography>
            <Typography variant="body2">
              {booking.client_first_name} {booking.client_last_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {booking.client_email} • {booking.client_phone}
            </Typography>
          </Box>

          {/* Car Info */}
          <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Автомобил
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
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Status */}
            <FormControl fullWidth>
              <InputLabel>{texts.status}</InputLabel>
              <Select
                value={formData.status}
                onChange={handleChange('status')}
                label={texts.status}
                disabled={isSaving}
              >
                <MenuItem value="pending">{texts.pending}</MenuItem>
                <MenuItem value="confirmed">{texts.confirmed}</MenuItem>
                <MenuItem value="cancelled">{texts.cancelled}</MenuItem>
                <MenuItem value="completed">{texts.completed}</MenuItem>
              </Select>
            </FormControl>

            {/* Deposit Status */}
            <FormControl fullWidth>
              <InputLabel>{texts.depositStatus}</InputLabel>
              <Select
                value={formData.deposit_status}
                onChange={handleChange('deposit_status')}
                label={texts.depositStatus}
                disabled={isSaving}
              >
                <MenuItem value="pending">{texts.depositPending}</MenuItem>
                <MenuItem value="paid">{texts.depositPaid}</MenuItem>
                <MenuItem value="refunded">{texts.depositRefunded}</MenuItem>
              </Select>
            </FormControl>

            {/* Notes */}
            <TextField
              fullWidth
              multiline
              rows={4}
              label={texts.notes}
              value={formData.notes}
              onChange={handleChange('notes')}
              placeholder={texts.notesPlaceholder}
              disabled={isSaving}
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} disabled={isSaving}>
          {texts.cancel}
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={isSaving}
          startIcon={isSaving ? <CircularProgress size={20} /> : null}
        >
          {isSaving ? texts.saving : texts.save}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
