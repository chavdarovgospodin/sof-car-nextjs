import { SxProps, Theme } from '@mui/material';

export const styles = {
  heroContainer: {
    backgroundImage:
      'url(/generated-image-f179045f-49f4-4402-880f-8663654edd10.jpeg)',
    backgroundSize: 'cover',
    backgroundPosition: '30% 70%',
    color: 'white',
    py: { xs: 8, md: 12 },
    position: 'relative',
    overflow: 'hidden',
    minHeight: '65vh',
    display: 'flex',
    alignItems: 'center',
  } as SxProps<Theme>,

  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
  } as SxProps<Theme>,

  contentContainer: {
    position: 'relative',
    zIndex: 2,
  } as SxProps<Theme>,

  heroContent: {
    textAlign: { xs: 'center', md: 'left' },
  } as SxProps<Theme>,

  mainTitle: {
    fontWeight: 'bold',
    fontSize: { xs: '2.5rem', md: '3rem' },
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    mb: 3,
  } as SxProps<Theme>,

  subtitle: {
    fontWeight: 'normal',
    fontSize: { xs: '1.5rem', md: '2rem' },
    mb: 4,
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
  } as SxProps<Theme>,

  description: {
    maxWidth: '600px',
    mb: 4,
    opacity: 0.95,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: { xs: '1.2rem', md: '22px' },
    fontFamily: 'Source Sans Pro, Helvetica, sans-serif',
    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    lineHeight: 1.6,
  } as SxProps<Theme>,
};
