import { SxProps, Theme } from '@mui/material';

export const styles = {
  footer: {
    backgroundColor: 'grey.900',
    color: 'white',
    mt: 'auto',
  } as SxProps<Theme>,

  container: {
    py: 3,
  } as SxProps<Theme>,

  grid: {
    justifyContent: 'space-between',
  } as SxProps<Theme>,

  companyTitle: {
    color: 'primary.main',
  } as SxProps<Theme>,

  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1,
  } as SxProps<Theme>,

  contactIcon: {
    fontSize: 20,
    color: 'primary.main',
  } as SxProps<Theme>,

  socialTitle: {
    color: 'primary.main',
  } as SxProps<Theme>,

  socialIcons: {
    display: 'flex',
    gap: 1,
    mb: 3,
  } as SxProps<Theme>,

  socialButton: {
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'primary.main',
    },
  } as SxProps<Theme>,

  viberButton: {
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: 'primary.main !important',
    },
  } as SxProps<Theme>,

  viberIcon: {
    width: 20,
    height: 20,
    filter: 'brightness(0) invert(1)',
  } as SxProps<Theme>,

  businessHoursTitle: {
    fontWeight: 'bold',
  } as SxProps<Theme>,

  bottomBar: {
    borderTop: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    pt: 3,
    mt: 4,
    fontSize: '13px',
  } as SxProps<Theme>,

  bottomGrid: {
    alignItems: 'center',
  } as SxProps<Theme>,

  copyright: {
    color: 'grey.400',
  } as SxProps<Theme>,

  linksContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    justifyContent: { xs: 'center', md: 'flex-end' },
  } as SxProps<Theme>,

  footerLink: {
    color: 'grey.400',
    '&:hover': { color: 'white' },
  } as SxProps<Theme>,

  designerText: {
    fontSize: '11px',
    color: 'grey.400',
    textAlign: 'center',
  } as SxProps<Theme>,

  designerLink: {
    color: 'grey.400',
    '&:hover': { color: 'white' },
  } as SxProps<Theme>,

  paymentSection: {
    py: 2,
    background: 'linear-gradient(359deg, #4c5c85 0%, #c2fbff 100%)',
    borderTop: '1px solid #e0e0e0',
  } as SxProps<Theme>,

  paymentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: { xs: 1, sm: 2, md: 3 },
    flexWrap: 'wrap',
    mb: 2,
    pt: 1,
  } as SxProps<Theme>,

  sslBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    backgroundColor: '#4caf50',
    color: 'white',
    px: 1.5,
    py: 0.8,
    borderRadius: 1,
    fontSize: { xs: '0.7rem', sm: '0.8rem' },
    fontWeight: 700,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  } as SxProps<Theme>,

  ecoBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    backgroundColor: '#2e7d32',
    color: 'white',
    px: 1.5,
    py: 0.8,
    borderRadius: 1,
    fontSize: { xs: '0.7rem', sm: '0.8rem' },
    fontWeight: 700,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  } as SxProps<Theme>,

  paymentCard: {
    display: 'flex',
    gap: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    px: 1.5,
    py: 0.8,
    borderRadius: 1,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  } as SxProps<Theme>,

  cardIcon: {
    fontSize: '1.2rem',
  } as SxProps<Theme>,

  cardText: {
    color: 'white',
    fontWeight: 600,
  } as SxProps<Theme>,

  securityBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    backgroundColor: '#2196f3',
    color: 'white',
    px: 1.5,
    py: 0.8,
    borderRadius: 1,
    fontSize: { xs: '0.7rem', sm: '0.8rem' },
    fontWeight: 700,
    border: '2px solid #1976d2',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  } as SxProps<Theme>,

  paymentText: {
    color: 'white',
    fontSize: { xs: '0.75rem', sm: '0.85rem' },
    fontWeight: 500,
    opacity: 0.95,
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
  } as SxProps<Theme>,
};
