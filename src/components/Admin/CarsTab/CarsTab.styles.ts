import { SxProps, Theme } from '@mui/material';

export const carsTabStyles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  } as SxProps<Theme>,
  header: {
    mb: 3,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as SxProps<Theme>,
  carsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 3,
  } as SxProps<Theme>,
  carCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,
  carImage: {
    objectFit: 'cover',
  } as SxProps<Theme>,
  carContent: {
    flexGrow: 1,
  } as SxProps<Theme>,
  carHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    mb: 1,
  } as SxProps<Theme>,
  carDetails: {
    mb: 1,
  } as SxProps<Theme>,
  priceSection: {
    mt: 2,
    mb: 1,
  } as SxProps<Theme>,
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    mb: 0.5,
  } as SxProps<Theme>,
  priceAmount: {
    fontWeight: 'bold',
  } as SxProps<Theme>,
  priceCurrency: {
    ml: 1,
  } as SxProps<Theme>,
  depositRow: {
    display: 'flex',
    alignItems: 'center',
  } as SxProps<Theme>,
  depositIcon: {
    fontSize: 14,
    mr: 0.5,
    color: 'warning.main',
  } as SxProps<Theme>,
  featuresPreview: {
    mt: 1,
  } as SxProps<Theme>,
  statusSection: {
    mt: 1,
  } as SxProps<Theme>,
  cardActions: {
    justifyContent: 'space-between',
    px: 2,
    pb: 2,
  } as SxProps<Theme>,
  calendarButton: {
    color: 'primary.main',
  } as SxProps<Theme>,
  actionsContainer: {
    display: 'flex',
    gap: 1,
  } as SxProps<Theme>,
  noCarsContainer: {
    textAlign: 'center',
    py: 4,
  } as SxProps<Theme>,
  noCarsIcon: {
    fontSize: 64,
    color: 'text.secondary',
    mb: 2,
  } as SxProps<Theme>,
  noCarsTitle: {
    mb: 2,
  } as SxProps<Theme>,
  noCarsDescription: {
    mb: 2,
  } as SxProps<Theme>,
  addFirstCarButton: {
    mt: 2,
  } as SxProps<Theme>,
} as const;
