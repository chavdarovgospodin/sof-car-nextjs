import { SxProps, Theme } from '@mui/material';

export const styles = {
  paper: {
    padding: 4,
    backgroundColor: '#ffffff',
    borderRadius: 3,
    marginBottom: 3,
    border: '1px solid #e0e0e0',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  } as SxProps<Theme>,

  loadingContainer: {
    textAlign: 'center',
    py: 2,
    mb: 2,
  } as SxProps<Theme>,

  title: {
    textAlign: 'center',
    marginBottom: 4,
    color: '#1976d2',
    fontWeight: 'bold',
    fontSize: { xs: '1.5rem', md: '2rem' },
  } as SxProps<Theme>,

  grid: {
    alignItems: 'center',
  } as SxProps<Theme>,

  datePickerTextField: {
    cursor: 'pointer',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#1976d2',
        },
        backgroundColor: '#f8f9fa',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#1976d2',
          borderWidth: 2,
        },
      },
    },
    '& .MuiInputBase-input': {
      cursor: 'pointer',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      pointerEvents: 'none',
    },
  } as SxProps<Theme>,

  endDateTextField: {
    cursor: 'pointer',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none',
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      '&:hover': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#1976d2',
        },
        backgroundColor: '#f8f9fa',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      },
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#1976d2',
          borderWidth: 2,
        },
      },
    },
    '& .MuiInputBase-input': {
      cursor: 'pointer',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
      pointerEvents: 'none',
    },
    '& .MuiInputLabel-root': {
      color: '#1976d2',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none',
    },
  } as SxProps<Theme>,

  popper: {
    '& .MuiPickersLayout-root': {
      backgroundColor: '#fff',
      borderRadius: 2,
      boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    },
    '& .MuiPickersLayout-contentWrapper': {
      backgroundColor: '#fff',
    },
    '& .MuiPickersLayout-actionBar': {
      backgroundColor: '#f8f9fa',
      borderTop: '1px solid #e0e0e0',
    },
  } as SxProps<Theme>,

  searchButton: {
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#1565c0',
      transform: 'translateY(-1px)',
      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)',
    },
    height: 56,
    fontSize: '1.1rem',
    borderRadius: 2,
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
  } as SxProps<Theme>,

  errorAlert: {
    marginTop: 3,
    borderRadius: 2,
    '& .MuiAlert-icon': {
      color: '#d32f2f',
    },
  } as SxProps<Theme>,

  infoContainer: {
    marginTop: 3,
    textAlign: 'center',
  } as SxProps<Theme>,

  infoText: {
    marginBottom: 1,
    fontWeight: 500,
  } as SxProps<Theme>,

  calendarIcon: {
    marginRight: 1,
    color: '#1976d2',
  } as SxProps<Theme>,

  timeIcon: {
    marginRight: 1,
    color: '#1976d2',
  } as SxProps<Theme>,
};
