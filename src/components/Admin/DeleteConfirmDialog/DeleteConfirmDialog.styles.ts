import { SxProps, Theme } from '@mui/material';

export const deleteConfirmDialogStyles = {
  dialogPaper: {
    margin: 2,
    maxHeight: 'calc(100vh - 32px)',
  } as SxProps<Theme>,
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,
  alert: {
    mb: 2,
  } as SxProps<Theme>,
  warningAlert: {
    mb: 2,
  } as SxProps<Theme>,
  dialogActions: {
    p: 3,
  } as SxProps<Theme>,
} as const;
