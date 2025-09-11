import { SxProps, Theme } from '@mui/material';

export const styles = {
  appBar: {
    backgroundColor: 'white',
    opacity: 0.9,
    color: 'text.primary',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  } as SxProps<Theme>,

  toolbar: {
    justifyContent: 'space-between',
    px: '0 !important',
  } as SxProps<Theme>,

  logoLink: {
    textDecoration: 'none',
    outline: 'none',
    border: 'none',
    marginLeft: '-5px',
  } as SxProps<Theme>,

  desktopNavigation: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  } as SxProps<Theme>,

  navButton: {
    textTransform: 'none',
    fontWeight: 500,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  } as SxProps<Theme>,

  infoButton: {
    textTransform: 'none',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  } as SxProps<Theme>,

  infoMenu: {
    overflow: 'visible',
    mt: 1,
    transition: 'all 0.2s ease-in-out',
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: '50%',
      width: 0,
      height: 0,
      transform: 'translateX(-50%)',
      borderLeft: '8px solid transparent',
      borderRight: '8px solid transparent',
      borderBottom: '8px solid white',
      filter: 'drop-shadow(0 -1px 2px rgba(0,0,0,0.1))',
    },
  } as SxProps<Theme>,

  menuItem: {
    minWidth: 200,
  } as SxProps<Theme>,

  rightSide: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  } as SxProps<Theme>,

  phoneContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    marginRight: 2,
  } as SxProps<Theme>,

  phoneIcon: {
    fontSize: 20,
    color: 'primary.main',
  } as SxProps<Theme>,

  phoneLink: {
    textDecoration: 'none',
    color: 'inherit',
    outline: 'none',
    border: 'none',
  } as SxProps<Theme>,

  mobileMenuButton: {
    color: 'inherit',
  } as SxProps<Theme>,

  drawer: {
    display: { xs: 'block', md: 'none' },
    '& .MuiDrawer-paper': {
      boxSizing: 'border-box',
      width: 280,
    },
  } as SxProps<Theme>,

  drawerContent: {
    width: 280,
  } as SxProps<Theme>,

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 2,
    borderBottom: 1,
    borderColor: 'divider',
  } as SxProps<Theme>,

  drawerList: {
    p: 2,
  } as SxProps<Theme>,

  drawerListItem: {
    textDecoration: 'none',
    color: 'inherit',
    borderRadius: 1,
    mb: 1,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  } as SxProps<Theme>,

  infoSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  } as SxProps<Theme>,

  infoSectionTitle: {
    mb: 1,
    color: 'text.secondary',
  } as SxProps<Theme>,

  infoListItem: {
    textDecoration: 'none',
    color: 'inherit',
    pl: 3,
    py: 0.5,
    borderRadius: 1,
    '&:hover': {
      backgroundColor: 'action.hover',
    },
  } as SxProps<Theme>,

  infoListItemText: {
    variant: 'body2',
  } as SxProps<Theme>,
};
