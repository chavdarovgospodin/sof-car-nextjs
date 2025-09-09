'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  CheckCircle,
  Close,
  Person,
  Luggage,
  AcUnit,
  CalendarToday,
  DriveEta,
} from '@mui/icons-material';
import type { CarData } from '../../types/api';

interface CarDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  car: CarData | null;
  t: (key: string, values?: Record<string, unknown>) => string;
}

export function CarDetailsDialog({
  open,
  onClose,
  car,
  t,
}: CarDetailsDialogProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery('(max-width: 430px)');

  if (!car) return null;

  // Helper functions for structured features
  const getTransmissionText = (transmission: string) => {
    switch (transmission) {
      case 'manual':
        return t('booking.manualTransmission');
      case 'automatic':
        return t('booking.automaticTransmission');
      default:
        return t('booking.manualTransmission');
    }
  };

  const getLuggageText = () => {
    const large = car.large_luggage || 0;
    const small = car.small_luggage || 0;

    if (large > 0 && small > 0) {
      return `${t('booking.largeLuggage')} x${large}, ${t(
        'booking.smallLuggage'
      )} x${small}`;
    } else if (large > 0) {
      return `${t('booking.largeLuggage')} x${large}`;
    } else if (small > 0) {
      return `${t('booking.smallLuggage')} x${small}`;
    }
    return '';
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isMobile ? false : 'lg'}
      fullWidth={!isMobile}
      fullScreen={isSmallMobile}
      PaperProps={{
        sx: {
          ...(isMobile && {
            margin: isSmallMobile ? 0 : 1,
            maxHeight: isSmallMobile ? '100vh' : '95vh',
            height: isSmallMobile ? '100vh' : 'auto',
            width: isSmallMobile ? '100vw' : '95vw',
            borderRadius: isSmallMobile ? 0 : 2,
          }),

          ...(!isMobile && {
            maxWidth: 'lg',
          }),
        },
      }}
      scroll="body"
    >
      <DialogTitle
        sx={{
          ...(isMobile && {
            position: 'sticky',
            top: 0,
            zIndex: 1,
            backgroundColor: 'background.paper',
            borderBottom: '1px solid rgba(0,0,0,0.12)',
            py: { xs: 1.5, sm: 2 },
          }),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" component="div" color="primary.main">
            {car.brand} {car.model} {car.year}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'primary.main' }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ px: 2 }} />

      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          {/* Images Section */}
          <Grid
            container
            direction="row"
            // gridTemplateRows={'60% 40%'}
            spacing={2}
            gap={2}
            size={{ xs: 12, md: 6 }}
            sx={{ mb: 3 }}
          >
            {/* Main Image */}
            <Grid
              component={Box}
              size={{ xs: 12, md: 6 }}
              sx={{
                position: 'relative',
                height: { xs: 200, md: 300 },
                width: { xs: '100%', md: 400 },
                backgroundColor: '#f5f5f5',
                maxWidth: 400,
                borderRadius: 2,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {car.image_urls?.[selectedImageIndex] ? (
                <Image
                  src={car.image_urls[selectedImageIndex]}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <DriveEta sx={{ fontSize: 80, color: '#ccc' }} />
              )}
            </Grid>

            {/* Thumbnail Gallery - Vertical */}
            {car.image_urls && car.image_urls.length > 1 && (
              <Grid
                component={Box}
                size={{ xs: 12, md: 6 }}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(3, 1fr)', // 3 на ред на малки екрани
                    md: 'repeat(4, 1fr)', // 4 на ред на големи екрани
                  },
                  minWidth: 60,
                  gap: 1,
                  maxHeight: { xs: 200, md: 300 }, // Ограничаване на височината
                }}
              >
                {car.image_urls.map((url, index) => (
                  <Grid
                    component={Box}
                    size={{ xs: 12, md: 12 }}
                    key={index}
                    sx={{
                      aspectRatio: '1',
                      position: 'relative',
                      width: { xs: '100%', md: 160 },
                      height: { xs: 60, md: 120 },
                      borderRadius: 1,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border:
                        selectedImageIndex === index
                          ? '2px solid #1976d2'
                          : '1px solid #ddd',
                      opacity: selectedImageIndex === index ? 1 : 0.7,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        opacity: 1,
                      },
                    }}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={url}
                      alt={`${car.brand} ${car.model} ${index + 1}`}
                      fill
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
          <Divider sx={{ my: 2 }} />

          {/* Text Sections - Below Images */}
          <Box>
            {/* Characteristics */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 'bold', color: '#1976d2' }}
              >
                {t('booking.characteristics')}:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                {/* Seats */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    minWidth: 'fit-content',
                  }}
                >
                  <Person sx={{ fontSize: 20, color: '#666' }} />
                  <Typography variant="body2">
                    {car.seats || 5} {t('booking.seats')}
                  </Typography>
                </Box>

                {/* Luggage */}
                {getLuggageText() && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      minWidth: 'fit-content',
                    }}
                  >
                    <Luggage sx={{ fontSize: 20, color: '#666' }} />
                    <Typography variant="body2">{getLuggageText()}</Typography>
                  </Box>
                )}

                {/* Doors */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    minWidth: 'fit-content',
                  }}
                >
                  <DriveEta sx={{ fontSize: 20, color: '#666' }} />
                  <Typography variant="body2">
                    {car.doors || 4} {t('booking.doors')}
                  </Typography>
                </Box>

                {/* Transmission */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    minWidth: 'fit-content',
                  }}
                >
                  <DriveEta sx={{ fontSize: 20, color: '#666' }} />
                  <Typography variant="body2">
                    {getTransmissionText(car.transmission || 'manual')}
                  </Typography>
                </Box>

                {/* AC */}
                {car.ac && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      minWidth: 'fit-content',
                    }}
                  >
                    <AcUnit sx={{ fontSize: 20, color: '#666' }} />
                    <Typography variant="body2">{t('booking.ac')}</Typography>
                  </Box>
                )}

                {/* 4WD */}
                {car.four_wd && (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      minWidth: 'fit-content',
                    }}
                  >
                    <DriveEta sx={{ fontSize: 20, color: '#666' }} />
                    <Typography variant="body2">
                      {t('booking.fourWd')}
                    </Typography>
                  </Box>
                )}

                {/* Min Age */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    minWidth: 'fit-content',
                  }}
                >
                  <CalendarToday sx={{ fontSize: 20, color: '#666' }} />
                  <Typography variant="body2">
                    {t('booking.minAge')}: {car.min_age || 21} г.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Features Section - Only if there are custom features */}
            {car.features && car.features.length > 0 && (
              <>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#1976d2' }}
                  >
                    {t('booking.possibilities')}:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {car.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Box>
                </Box>
              </>
            )}

            <Divider sx={{ my: 2 }} />

            {/* Price Includes */}
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ fontWeight: 'bold', color: '#1976d2' }}
              >
                {t('booking.priceIncludes')}:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                  <Typography variant="body2">
                    {t('booking.payedRoadTax')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                  <Typography variant="body2">
                    {t('booking.insurance')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                  <Typography variant="body2">
                    {t('booking.unlimitedMileage')}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                  <Typography variant="body2">
                    {t('booking.assistance')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
