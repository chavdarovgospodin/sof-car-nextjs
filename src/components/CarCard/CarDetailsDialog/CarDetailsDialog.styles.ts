import { SxProps, Theme } from '@mui/material';

export const styles = {
  dialog: {
    margin: 0,
    maxHeight: '100vh',
    height: '100vh',
    width: '100vw',
    borderRadius: 0,
  } as SxProps<Theme>,

  dialogTitle: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: 'background.paper',
    borderBottom: '1px solid rgba(0,0,0,0.12)',
    py: { xs: 1.5, sm: 2 },
  } as SxProps<Theme>,

  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as SxProps<Theme>,

  titleText: {
    color: 'primary.main',
  } as SxProps<Theme>,

  closeButton: {
    color: 'primary.main',
  } as SxProps<Theme>,

  dialogContent: {
    p: 0,
  } as SxProps<Theme>,

  contentContainer: {
    p: 3,
  } as SxProps<Theme>,

  imagesGrid: {
    mb: 3,
  } as SxProps<Theme>,

  mainImageContainer: {
    position: 'relative',
    height: { xs: 200, md: 300 },
    width: { xs: '100%', md: 400 },
    backgroundColor: '#f5f5f5',
    maxWidth: 400,
    borderRadius: 2,
    overflow: 'hidden',
    flexShrink: 0,
  } as SxProps<Theme>,

  mainImage: {
    objectFit: 'cover',
  } as SxProps<Theme>,

  placeholderIcon: {
    fontSize: 80,
    color: '#ccc',
  } as SxProps<Theme>,

  thumbnailGrid: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'repeat(3, 1fr)',
      md: 'repeat(4, 1fr)',
    },
    minWidth: 60,
    gap: 1,
    maxHeight: { xs: 200, md: 300 },
  } as SxProps<Theme>,

  thumbnailItem: {
    aspectRatio: '1',
    position: 'relative',
    width: { xs: '100%', md: 160 },
    height: { xs: 60, md: 120 },
    borderRadius: 1,
    overflow: 'hidden',
    cursor: 'pointer',
    border: '1px solid #ddd',
    opacity: 0.7,
    transition: 'all 0.2s ease',
    '&:hover': {
      opacity: 1,
    },
  } as SxProps<Theme>,

  selectedThumbnail: {
    border: '2px solid #1976d2',
    opacity: 1,
  } as SxProps<Theme>,

  thumbnailImage: {
    objectFit: 'cover',
  } as SxProps<Theme>,

  divider: {
    my: 2,
  } as SxProps<Theme>,

  characteristicsTitle: {
    fontWeight: 'bold',
    color: '#1976d2',
  } as SxProps<Theme>,

  characteristicsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    mb: 2,
  } as SxProps<Theme>,

  characteristicItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    minWidth: 'fit-content',
  } as SxProps<Theme>,

  characteristicIcon: {
    fontSize: 20,
    color: '#666',
  } as SxProps<Theme>,

  featuresTitle: {
    fontWeight: 'bold',
    color: '#1976d2',
  } as SxProps<Theme>,

  featuresContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
  } as SxProps<Theme>,

  featureChip: {
    mb: 1,
  } as SxProps<Theme>,

  priceIncludesTitle: {
    fontWeight: 'bold',
    color: '#1976d2',
  } as SxProps<Theme>,

  priceIncludesContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  } as SxProps<Theme>,

  priceIncludesItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,

  checkIcon: {
    fontSize: 16,
    color: '#4caf50',
  } as SxProps<Theme>,
};
