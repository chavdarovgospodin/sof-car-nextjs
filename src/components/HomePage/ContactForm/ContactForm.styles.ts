import { SxProps, Theme } from '@mui/material';

export const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  } as SxProps<Theme>,

  nameEmailRow: {
    display: 'flex',
    gap: 2,
    flexDirection: { xs: 'column', sm: 'row' },
  } as SxProps<Theme>,

  nameField: {
    flex: 1,
  } as SxProps<Theme>,

  emailField: {
    flex: 1,
  } as SxProps<Theme>,

  phoneField: {
    width: '100%',
  } as SxProps<Theme>,

  messageField: {
    width: '100%',
    '& .MuiInputBase-root': {
      minHeight: 120,
    },
  } as SxProps<Theme>,

  submitButton: {
    width: '100%',
    py: 1.5,
    fontSize: '1.1rem',
    fontWeight: 'bold',
  } as SxProps<Theme>,

  loadingButton: {
    width: '100%',
    py: 1.5,
    fontSize: '1.1rem',
    fontWeight: 'bold',
  } as SxProps<Theme>,
};
