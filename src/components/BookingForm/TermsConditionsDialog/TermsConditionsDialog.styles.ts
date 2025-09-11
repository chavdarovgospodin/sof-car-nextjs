import { SxProps, Theme } from '@mui/material';

export const styles = {
  dialog: {
    maxHeight: '100vh',
    margin: 0,
    borderRadius: 0,
  } as SxProps<Theme>,

  dialogContent: {
    pb: 2,
  } as SxProps<Theme>,

  sectionTitle: {
    mt: 2,
    mb: 2,
  } as SxProps<Theme>,

  subsectionTitle: {
    fontWeight: 'bold',
    mt: 2,
  } as SxProps<Theme>,

  divider: {
    my: 3,
  } as SxProps<Theme>,

  dialogActions: {
    p: 2,
  } as SxProps<Theme>,
};
