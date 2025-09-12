import { SxProps, Theme } from '@mui/material';

export const deleteBookingDialogStyles = {
  dialogTitle: {
    pb: 1,
  } as SxProps<Theme>,
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,
  confirmMessage: {
    mb: 2,
  } as SxProps<Theme>,
  bookingInfo: {
    bgcolor: 'grey.50',
    p: 2,
    borderRadius: 1,
    mb: 2,
  } as SxProps<Theme>,
  warningMessage: {
    fontWeight: 'medium',
    mb: 2,
  } as SxProps<Theme>,
  infoMessage: {
    fontWeight: 'medium',
  } as SxProps<Theme>,
  dialogActions: {
    p: 2,
    gap: 1,
  } as SxProps<Theme>,
} as const;
