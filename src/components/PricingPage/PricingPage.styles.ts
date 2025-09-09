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

  tableRow: {
    '&:nth-of-type(odd)': { backgroundColor: 'grey.50' },
  } as SxProps<Theme>,

  classTitle: {
    color: 'primary.main',
  } as SxProps<Theme>,

  classModels: {
    color: 'text.secondary',
  } as SxProps<Theme>,

  priceContainer: {
    textAlign: 'center',
  } as SxProps<Theme>,

  priceValue: {
    color: 'primary.main',
  } as SxProps<Theme>,

  priceCurrency: {
    ml: 1,
  } as SxProps<Theme>,

  pricePerDay: {
    color: 'text.secondary',
  } as SxProps<Theme>,

  depositContainer: {
    textAlign: 'center',
  } as SxProps<Theme>,

  depositValue: {
    color: 'success.main',
  } as SxProps<Theme>,

  depositLabel: {
    color: 'text.secondary',
  } as SxProps<Theme>,

  featureItem: {
    py: 0,
  } as SxProps<Theme>,

  featureIcon: {
    minWidth: 32,
  } as SxProps<Theme>,

  pickupDeliveryTitle: {
    mt: 3,
    mb: 2,
  } as SxProps<Theme>,

  feeCard: {
    p: 2,
    textAlign: 'center',
    border: '1px solid',
    borderColor: 'divider',
  } as SxProps<Theme>,

  feeIcon: {
    mb: 1,
  } as SxProps<Theme>,

  includedFeaturesGrid: {
    spacing: 3,
  } as SxProps<Theme>,
};
