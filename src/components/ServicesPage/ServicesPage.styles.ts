import { SxProps, Theme } from '@mui/material';

export const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: 'grey.50',
  } as SxProps<Theme>,

  heroSection: {
    py: { xs: 6, md: 8 },
    background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
    color: 'white',
  } as SxProps<Theme>,

  heroTitle: {
    mb: 3,
  } as SxProps<Theme>,

  heroSubtitle: {
    opacity: 0.9,
  } as SxProps<Theme>,

  mainContent: {
    py: { xs: 6, md: 8 },
  } as SxProps<Theme>,

  paper: {
    p: { xs: 3, md: 4 },
    mb: 4,
  } as SxProps<Theme>,

  sectionTitle: {
    mb: 3,
  } as SxProps<Theme>,

  subsectionTitle: {
    mt: 3,
  } as SxProps<Theme>,

  classTitle: {
    color: 'primary.main',
  } as SxProps<Theme>,

  classSection: {
    mb: 4,
  } as SxProps<Theme>,

  divider: {
    my: 3,
  } as SxProps<Theme>,

  serviceCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 2,
  } as SxProps<Theme>,
};
