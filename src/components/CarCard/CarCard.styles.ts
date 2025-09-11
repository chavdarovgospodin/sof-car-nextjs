import { SxProps, Theme } from '@mui/material';

export const styles = {
  card: {
    width: '100%',
    maxWidth: '100%',
    height: 'fit-content',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    },
    position: 'relative',
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,

  headerBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    zIndex: 2,
  } as SxProps<Theme>,

  chip: {
    fontWeight: 'bold',
  } as SxProps<Theme>,

  imageContainer: {
    position: 'relative',
    height: 250,
    backgroundColor: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    cursor: 'pointer',
  } as SxProps<Theme>,

  image: {
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
  } as SxProps<Theme>,

  hoverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  } as SxProps<Theme>,

  zoomIconContainer: {
    borderRadius: '50%',
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  } as SxProps<Theme>,

  mobileZoomButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 2,
    display: { xs: 'block', md: 'none' },
  } as SxProps<Theme>,

  mobileZoomIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    animation: 'pulse 2s infinite',
    '@keyframes pulse': {
      '0%': {
        transform: 'scale(1)',
        opacity: 0.8,
      },
      '50%': {
        transform: 'scale(1.1)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 0.8,
      },
    },
  } as SxProps<Theme>,

  placeholderIcon: {
    fontSize: 80,
    color: '#ccc',
  } as SxProps<Theme>,

  cardContent: {
    padding: 2,
    flexGrow: 1,
  } as SxProps<Theme>,

  carTitle: {
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#1976d2',
  } as SxProps<Theme>,

  featuresContainer: {
    mt: 1,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1.5,
    alignItems: 'center',
  } as SxProps<Theme>,

  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  } as SxProps<Theme>,

  featureIcon: {
    fontSize: 16,
    color: '#666',
  } as SxProps<Theme>,

  customFeaturesItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  } as SxProps<Theme>,

  tooltip: {
    '& .MuiTooltip-tooltip': {
      maxWidth: 300,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
  } as SxProps<Theme>,

  tooltipTitle: {
    fontWeight: 'bold',
    mb: 1,
  } as SxProps<Theme>,

  tooltipItem: {
    mb: 0.5,
  } as SxProps<Theme>,

  infoButton: {
    p: 0.5,
  } as SxProps<Theme>,

  infoIcon: {
    fontSize: 16,
    color: 'primary.main',
  } as SxProps<Theme>,

  divider: {
    marginY: 1,
  } as SxProps<Theme>,

  priceSection: {
    marginBottom: 2,
  } as SxProps<Theme>,

  dailyPrice: {
    fontSize: '0.875rem',
    marginBottom: 0.5,
  } as SxProps<Theme>,

  totalPrice: {
    fontWeight: 'bold',
    color: '#1976d2',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,

  totalPriceText: {
    fontSize: '0.875rem',
  } as SxProps<Theme>,

  euroIcon: {
    fontSize: 16,
    marginRight: 0.5,
  } as SxProps<Theme>,

  depositContainer: {
    marginTop: 1,
    padding: 1,
    backgroundColor: '#fff3e0',
    borderRadius: 1,
    border: '1px solid #ffb74d',
  } as SxProps<Theme>,

  depositText: {
    fontWeight: 'bold',
    color: '#e65100',
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  } as SxProps<Theme>,

  securityIcon: {
    fontSize: 16,
  } as SxProps<Theme>,

  depositInfo: {
    fontSize: '0.7rem',
    display: 'block',
    marginTop: 0.5,
  } as SxProps<Theme>,

  priceIncludesContainer: {
    marginBottom: 2,
  } as SxProps<Theme>,

  priceIncludesTitle: {
    marginBottom: 1,
    fontWeight: 500,
  } as SxProps<Theme>,

  priceIncludesItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  } as SxProps<Theme>,

  checkIcon: {
    fontSize: 16,
    color: '#4caf50',
  } as SxProps<Theme>,

  priceIncludesText: {
    fontSize: '0.75rem',
  } as SxProps<Theme>,

  cardActions: {
    padding: 2,
    paddingTop: 0,
  } as SxProps<Theme>,

  bookButton: {
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#1565c0',
    },
    height: 48,
    fontWeight: 'bold',
  } as SxProps<Theme>,
};
