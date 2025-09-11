import { SxProps, Theme } from '@mui/material';

export const styles = {
  section: {
    py: { xs: 6, md: 8 },
    backgroundColor: 'white',
  } as SxProps<Theme>,

  title: {
    textAlign: 'center',
    mb: 6,
    fontWeight: 'bold',
  } as SxProps<Theme>,

  featureCard: {
    p: 4,
    textAlign: 'center',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    },
  } as SxProps<Theme>,

  featureIcon: {
    mb: 3,
    fontSize: 40,
    color: '#1976d2',
  } as SxProps<Theme>,

  featureTitle: {
    mb: 2,
    fontWeight: 'bold',
  } as SxProps<Theme>,

  featureDescription: {
    color: 'text.secondary',
    lineHeight: 1.6,
  } as SxProps<Theme>,
};
