import { SxProps, Theme } from '@mui/material';

export const styles = {
  formContainer: {
    p: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 3,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
  } as SxProps<Theme>,

  formTitle: {
    mb: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'primary.main',
  } as SxProps<Theme>,

  formGrid: {
    mb: 3,
  } as SxProps<Theme>,

  searchButton: {
    width: '100%',
    py: 1.5,
    fontSize: '1.1rem',
    fontWeight: 'bold',
  } as SxProps<Theme>,

  alert: {
    mb: 2,
  } as SxProps<Theme>,
};
