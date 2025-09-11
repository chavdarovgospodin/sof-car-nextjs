import { SxProps, Theme } from '@mui/material';

export const styles = {
  section: {
    pt: { xs: 2, md: 4 },
    pb: { xs: 4, md: 8 },
    backgroundColor: '#f5f5f5',
  } as SxProps<Theme>,

  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    py: 8,
  } as SxProps<Theme>,

  title: {
    mb: 4,
  } as SxProps<Theme>,

  subtitle: {
    mb: 4,
    color: 'text.secondary',
  } as SxProps<Theme>,

  galleryContainer: {
    position: 'relative',
  } as SxProps<Theme>,

  navButtonLeft: {
    position: 'absolute',
    left: 8,
    top: '50%',
    transform: 'translateY(-50%) translateX(-150%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 3,
    width: 40,
    height: 40,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    '&:disabled': {
      opacity: 0.3,
    },
  } as SxProps<Theme>,

  navButtonRight: {
    position: 'absolute',
    right: 8,
    top: '50%',
    transform: 'translateY(-50%) translateX(150%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 3,
    width: 40,
    height: 40,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    '&:disabled': {
      opacity: 0.3,
    },
  } as SxProps<Theme>,

  carCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
    backgroundColor: 'white',
    border: '1px solid #e5e5e5',
    overflow: 'hidden',
    position: 'relative',
    minHeight: 220,
  } as SxProps<Theme>,

  mobileNavButtonLeft: {
    position: 'absolute',
    left: 8,
    top: '25%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 3,
    width: 40,
    height: 40,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    '&:disabled': {
      opacity: 0.3,
    },
  } as SxProps<Theme>,

  mobileNavButtonRight: {
    position: 'absolute',
    right: 8,
    top: '25%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 3,
    width: 40,
    height: 40,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    '&:disabled': {
      opacity: 0.3,
    },
  } as SxProps<Theme>,

  yearBadge: {
    position: 'absolute',
    top: 6,
    left: 16,
    backgroundColor: '#5C9CDB',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.8rem',
    height: 26,
    borderRadius: 1.5,
    zIndex: 2,
    '& .MuiChip-label': {
      px: 1.2,
    },
  } as SxProps<Theme>,

  classBadge: {
    position: 'absolute',
    top: 6,
    right: 16,
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.8rem',
    height: 26,
    borderRadius: 1.5,
    zIndex: 2,
    '& .MuiChip-label': {
      px: 1.2,
    },
  } as SxProps<Theme>,

  mainContentContainer: {
    display: { xs: 'flex', sm: 'grid' },
    flexDirection: { xs: 'column', sm: 'row' },
    gridTemplateColumns: { xs: 'none', sm: '60% 40%' },
    p: 2,
    pt: 5,
    pb: 0,
    gap: 3,
    flex: 1,
  } as SxProps<Theme>,

  imageContainer: {
    width: { xs: '100%', sm: 320 },
    height: { xs: 200, sm: 220 },
    position: 'relative',
    backgroundColor: '#fafafa',
    borderRadius: 2,
    overflow: 'hidden',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  } as SxProps<Theme>,

  placeholderIcon: {
    fontSize: 40,
    color: '#d0d0d0',
  } as SxProps<Theme>,

  carInfoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: 0,
  } as SxProps<Theme>,

  carTitle: {
    fontSize: '1.3rem',
    fontWeight: 600,
    color: '#333',
    lineHeight: 1.2,
    mb: 2,
  } as SxProps<Theme>,

  specificationsContainer: {
    mb: 2,
  } as SxProps<Theme>,

  specItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1,
  } as SxProps<Theme>,

  specIcon: {
    fontSize: '1.1rem',
    color: '#888',
  } as SxProps<Theme>,

  specText: {
    color: 'black',
    fontSize: '0.9rem',
    fontWeight: 400,
  } as SxProps<Theme>,

  featuresContainer: {
    mb: 2,
  } as SxProps<Theme>,

  featuresTitle: {
    color: '#666',
    fontSize: '0.8rem',
    fontWeight: 600,
    mb: 1,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  } as SxProps<Theme>,

  featuresChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.5,
  } as SxProps<Theme>,

  featureChip: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    fontSize: '0.7rem',
    height: 20,
    '& .MuiChip-label': {
      px: 0.8,
    },
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

  tooltipButton: {
    p: 0.5,
  } as SxProps<Theme>,

  tooltipIcon: {
    fontSize: 16,
    color: 'primary.main',
  } as SxProps<Theme>,

  priceContainer: {
    mb: 2,
  } as SxProps<Theme>,

  price: {
    color: '#1976d2',
    fontSize: '1.2rem',
    fontWeight: 700,
    mb: 0.5,
  } as SxProps<Theme>,

  priceSubtext: {
    color: '#666',
    fontSize: '0.8rem',
  } as SxProps<Theme>,

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mb: 2,
  } as SxProps<Theme>,

  bookButton: {
    backgroundColor: '#1976d2',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.9rem',
    py: 1.2,
    px: 3,
    width: '250px',
    borderRadius: 2,
    textTransform: 'none',
    boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
    '&:hover': {
      backgroundColor: '#1565c0',
      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
    },
  } as SxProps<Theme>,

  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    mt: 4,
    gap: 1,
  } as SxProps<Theme>,

  paginationDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  } as SxProps<Theme>,
};
