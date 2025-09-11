import { SxProps, Theme } from '@mui/material';

export const styles = {
  section: {
    py: { xs: 2, md: 4 },
    backgroundColor: 'grey.50',
  } as SxProps<Theme>,

  ctaHeader: {
    py: { xs: 6, md: 4 },
    color: 'primary.light',
  } as SxProps<Theme>,

  ctaTitle: {
    textAlign: 'center',
  } as SxProps<Theme>,

  mapContainer: {
    mb: 6,
  } as SxProps<Theme>,

  map: {
    width: '100%',
    height: 450,
    borderRadius: 2,
    overflow: 'hidden',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  } as SxProps<Theme>,

  contactTitle: {
    textAlign: 'center',
    mb: 6,
  } as SxProps<Theme>,

  contactFormTitle: {
    mb: 3,
  } as SxProps<Theme>,

  contactInfoTitle: {
    mb: 3,
  } as SxProps<Theme>,

  paperContainer: {
    p: 3,
    backgroundColor: 'white',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    minHeight: '420px',
  } as SxProps<Theme>,

  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 4,
  } as SxProps<Theme>,

  contactIcon: {
    color: 'primary.main',
  } as SxProps<Theme>,

  contactLabel: {
    color: 'text.secondary',
  } as SxProps<Theme>,

  contactValue: {
    textDecoration: 'none',
  } as SxProps<Theme>,
};
