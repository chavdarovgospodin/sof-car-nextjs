import { SxProps, Theme } from '@mui/material';

export const styles = {
  button: (isMobile: boolean): SxProps<Theme> => ({
    p: 1,
    mr: isMobile ? 0 : 2,
    minWidth: isMobile ? '30px' : '120px',
    width: isMobile ? '30px' : '160px',
    textTransform: 'none',
    borderColor: isMobile ? 'white' : 'primary.main',
    color: 'primary.main',
    '&:hover': {
      borderColor: 'primary.dark',
      backgroundColor: 'primary.light',
      color: 'primary.dark',
    },
  }),

  menuPaper: {
    overflow: 'visible',
    mt: 1,
    transition: 'all 0.2s ease-in-out',
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 20,
      width: 0,
      height: 0,
      transform: 'translateX(50%)',
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderBottom: '8px solid white',
      filter: 'drop-shadow(0 -1px 2px rgba(0,0,0,0.1))',
    },
  } as SxProps<Theme>,

  menuItem: {
    minWidth: '120px',
    '&.Mui-selected': {
      backgroundColor: 'primary.light',
      '&:hover': {
        backgroundColor: 'primary.light',
      },
    },
  } as SxProps<Theme>,
};
