import { SxProps, Theme } from '@mui/material';

export const bookingEditDialogStyles = {
  clientInfoBox: {
    mb: 3,
    p: 2,
    bgcolor: 'grey.50',
    borderRadius: 1,
  } as SxProps<Theme>,
  carInfoBox: {
    mb: 3,
    p: 2,
    bgcolor: 'grey.50',
    borderRadius: 1,
  } as SxProps<Theme>,
  formFieldsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  } as SxProps<Theme>,
  dialogActions: {
    p: 2,
  } as SxProps<Theme>,
} as const;
