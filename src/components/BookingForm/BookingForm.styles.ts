import { SxProps, Theme } from '@mui/material';

export const styles = {
  dialog: {
    '& .MuiDialog-paper': {
      margin: 0,
      maxHeight: '100vh',
      borderRadius: 0,
    },
  } as SxProps<Theme>,

  dialogContent: {
    p: '16px 8px',
  } as SxProps<Theme>,

  carDetailsPaper: {
    p: 1,
    mb: 3,
  } as SxProps<Theme>,

  carDetailsTitle: {
    mb: 3,
    color: '#1976d2',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,

  carInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 2,
  } as SxProps<Theme>,

  carChip: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
  } as SxProps<Theme>,

  yearContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 2,
  } as SxProps<Theme>,

  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1,
  } as SxProps<Theme>,

  priceText: {
    fontWeight: 'bold',
  } as SxProps<Theme>,

  daysContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    mb: 2,
  } as SxProps<Theme>,

  totalPrice: {
    fontWeight: 'bold',
  } as SxProps<Theme>,

  divider: {
    my: 2,
  } as SxProps<Theme>,

  featuresContainer: {
    mb: 3,
  } as SxProps<Theme>,

  featuresTitle: {
    fontWeight: 'bold',
    color: 'primary.main',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    marginBottom: 2,
  } as SxProps<Theme>,

  featuresChips: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    marginBottom: 2,
  } as SxProps<Theme>,

  featureChip: {
    fontSize: '0.75rem',
    height: 28,
    '& .MuiChip-label': {
      padding: '0 8px',
    },
  } as SxProps<Theme>,

  depositContainer: {
    marginBottom: 2,
    padding: 2,
    backgroundColor: '#fff3e0',
    borderRadius: 2,
    border: '1px solid #ffb74d',
  } as SxProps<Theme>,

  depositTitle: {
    fontWeight: 'bold',
    color: '#e65100',
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    marginBottom: 1,
  } as SxProps<Theme>,

  depositAmount: {
    fontWeight: 'bold',
    color: '#e65100',
    marginBottom: 1,
  } as SxProps<Theme>,

  depositInfo: {
    fontSize: '0.875rem',
  } as SxProps<Theme>,

  clientInfoPaper: {
    p: 3,
    mb: 3,
  } as SxProps<Theme>,

  clientInfoTitle: {
    mb: 3,
    color: '#1976d2',
  } as SxProps<Theme>,

  formGrid: {
    mb: 4,
  } as SxProps<Theme>,

  termsContainer: {
    mb: 3,
    alignItems: 'center',
  } as SxProps<Theme>,

  termsButton: {
    p: 0,
    minWidth: 'auto',
    textTransform: 'none',
    textDecoration: 'underline',
    fontSize: 'inherit',
    fontWeight: 'inherit',
  } as SxProps<Theme>,

  termsError: {
    mt: 1,
    display: 'block',
  } as SxProps<Theme>,

  paymentTitle: {
    mb: 2,
  } as SxProps<Theme>,

  paymentFormControl: {
    mb: 3,
  } as SxProps<Theme>,

  paymentLabel: {
    mb: 2,
  } as SxProps<Theme>,

  radioGroup: {
    flexDirection: 'row',
    gap: 2,
  } as SxProps<Theme>,

  paymentOption: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,

  alert: {
    mb: 3,
  } as SxProps<Theme>,

  securityAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,

  dialogActions: {
    justifyContent: 'center',
  } as SxProps<Theme>,

  confirmButton: {
    // No specific styles needed for the confirm button
  } as SxProps<Theme>,
  checkbox: {
    marginRight: 8,
    cursor: 'pointer',
    outline: 'none',
  } as SxProps<Theme>,
};
