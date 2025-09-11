import { SxProps, Theme } from '@mui/material';

export const styles = {
  section: {
    py: { xs: 4, md: 6 },
    backgroundColor: 'grey.50',
  } as SxProps<Theme>,

  imageContainer: {
    mb: 2,
  } as SxProps<Theme>,

  title: {
    mb: 2,
    textAlign: 'left',
    fontSize: '2rem',
    fontWeight: 'bold',
  } as SxProps<Theme>,

  infoBox: {
    p: 3,
    textAlign: 'center',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-4px)',
      transition: 'transform 0.3s ease',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
    },
  } as SxProps<Theme>,

  iconContainer: {
    mb: 2,
  } as SxProps<Theme>,

  whyChooseUs: {
    mt: 6,
  } as SxProps<Theme>,

  whyChooseUsTitle: {
    mb: 4,
  } as SxProps<Theme>,
};
