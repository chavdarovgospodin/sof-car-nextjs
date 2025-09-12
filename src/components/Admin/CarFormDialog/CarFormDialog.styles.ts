import { SxProps, Theme } from '@mui/material';

export const carFormDialogStyles = {
  dialogPaper: {
    margin: 2,
    maxHeight: 'calc(100vh - 32px)',
  } as SxProps<Theme>,
  dialogTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as SxProps<Theme>,
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  } as SxProps<Theme>,
  sectionTitle: {
    mb: 2,
  } as SxProps<Theme>,
  formRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
  } as SxProps<Theme>,
  formField: {
    minWidth: 200,
    flex: '1 1 200px',
  } as SxProps<Theme>,
  formFieldSmall: {
    minWidth: 150,
    flex: '1 1 150px',
  } as SxProps<Theme>,
  formFieldTiny: {
    width: 120,
  } as SxProps<Theme>,
  formFieldMedium: {
    width: 150,
  } as SxProps<Theme>,
  divider: {
    my: 2,
  } as SxProps<Theme>,
  featuresContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    alignItems: 'center',
  } as SxProps<Theme>,
  featuresInput: {
    minWidth: 200,
  } as SxProps<Theme>,
  featuresChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
  } as SxProps<Theme>,
  imagesDescription: {
    mb: 2,
  } as SxProps<Theme>,
  uploadButton: {
    mb: 2,
  } as SxProps<Theme>,
  imagesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
  } as SxProps<Theme>,
  imageBox: {
    position: 'relative',
    borderRadius: 1,
    overflow: 'hidden',
    width: 150,
    height: 120,
  } as SxProps<Theme>,
  imageBoxMain: {
    border: '3px solid #1976d2',
  } as SxProps<Theme>,
  imageBoxRegular: {
    border: '1px solid #ddd',
  } as SxProps<Theme>,
  image: {
    objectFit: 'cover',
  } as SxProps<Theme>,
  mainImageIndicator: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: '#1976d2',
    color: 'white',
    px: 1,
    py: 0.5,
    borderRadius: 0.5,
    fontSize: '0.75rem',
    fontWeight: 'bold',
  } as SxProps<Theme>,
  newImageIndicator: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: '#4caf50',
    color: 'white',
    px: 0.5,
    py: 0.25,
    borderRadius: 0.25,
    fontSize: '0.65rem',
    fontWeight: 'bold',
  } as SxProps<Theme>,
  imageActions: {
    position: 'absolute',
    top: 4,
    right: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  } as SxProps<Theme>,
  actionButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: 24,
    height: 24,
  } as SxProps<Theme>,
  dialogActions: {
    p: 3,
  } as SxProps<Theme>,
} as const;
