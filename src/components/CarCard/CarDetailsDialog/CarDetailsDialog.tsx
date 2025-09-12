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
import { CarDetailsDialogProps } from './CarDetailsDialog.types';
import { styles } from './CarDetailsDialog.styles';
import { useBreakpoint } from '../../../providers';
import { getTransmissionText, getLuggageText } from './CarDetailsDialog.const';

export function CarDetailsDialog({
  open,
  onClose,
  car,
  t,
}: CarDetailsDialogProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { isMobile } = useBreakpoint();
  const isSmallMobile = useMediaQuery('(max-width: 430px)');

  if (!car) return null;

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
          ...(isMobile && styles.dialogTitle),
        }}
      >
        <Box sx={styles.titleContainer}>
          <Typography variant="h5" component="div" sx={styles.titleText}>
            {car.brand} {car.model} {car.year}
          </Typography>
          <IconButton onClick={onClose} sx={styles.closeButton}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Divider sx={{ px: 2 }} />

      <DialogContent sx={styles.dialogContent}>
        <Box sx={styles.contentContainer}>
          {/* Images Section */}
          <Grid
            container
            direction="row"
            spacing={2}
            gap={2}
            size={{ xs: 12, md: 6 }}
            sx={styles.imagesGrid}
          >
            {/* Main Image */}
            <Grid
              component={Box}
              size={{ xs: 12, md: 6 }}
              sx={styles.mainImageContainer}
            >
              {car.image_urls?.[selectedImageIndex] ? (
                <Image
                  src={car.image_urls[selectedImageIndex]}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <DriveEta sx={styles.placeholderIcon} />
              )}
            </Grid>

            {/* Thumbnail Gallery - Vertical */}
            {car.image_urls && car.image_urls.length > 1 && (
              <Grid
                component={Box}
                size={{ xs: 12, md: 6 }}
                sx={styles.thumbnailGrid}
              >
                {car.image_urls.map((url, index) => (
                  <Box
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
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                ))}
              </Grid>
            )}
          </Grid>
          <Divider sx={styles.divider} />

          {/* Text Sections - Below Images */}
          <Box>
            {/* Characteristics */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={styles.characteristicsTitle}
              >
                {t('booking.characteristics')}:
              </Typography>
              <Box sx={styles.characteristicsContainer}>
                {/* Seats */}
                <Box sx={styles.characteristicItem}>
                  <Person sx={styles.characteristicIcon} />
                  <Typography variant="body2">
                    {car.seats || 5} {t('booking.seats')}
                  </Typography>
                </Box>

                {/* Luggage */}
                {getLuggageText(car, t) && (
                  <Box sx={styles.characteristicItem}>
                    <Luggage sx={styles.characteristicIcon} />
                    <Typography variant="body2">
                      {getLuggageText(car, t)}
                    </Typography>
                  </Box>
                )}

                {/* Doors */}
                <Box sx={styles.characteristicItem}>
                  <DriveEta sx={styles.characteristicIcon} />
                  <Typography variant="body2">
                    {car.doors || 4} {t('booking.doors')}
                  </Typography>
                </Box>

                {/* Transmission */}
                <Box sx={styles.characteristicItem}>
                  <DriveEta sx={styles.characteristicIcon} />
                  <Typography variant="body2">
                    {getTransmissionText(car.transmission || 'manual', t)}
                  </Typography>
                </Box>

                {/* AC */}
                {car.ac && (
                  <Box sx={styles.characteristicItem}>
                    <AcUnit sx={styles.characteristicIcon} />
                    <Typography variant="body2">{t('booking.ac')}</Typography>
                  </Box>
                )}

                {/* 4WD */}
                {car.four_wd && (
                  <Box sx={styles.characteristicItem}>
                    <DriveEta sx={styles.characteristicIcon} />
                    <Typography variant="body2">
                      {t('booking.fourWd')}
                    </Typography>
                  </Box>
                )}

                {/* Min Age */}
                <Box sx={styles.characteristicItem}>
                  <CalendarToday sx={styles.characteristicIcon} />
                  <Typography variant="body2">
                    {t('booking.minAge')}: {car.min_age || 21} г.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Features Section - Only if there are custom features */}
            {car.features && car.features.length > 0 && (
              <>
                <Divider sx={styles.divider} />
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={styles.featuresTitle}
                  >
                    {t('booking.possibilities')}:
                  </Typography>
                  <Box sx={styles.featuresContainer}>
                    {car.features.map((feature, index) => (
                      <Chip
                        key={index}
                        label={feature}
                        variant="outlined"
                        size="small"
                        sx={styles.featureChip}
                      />
                    ))}
                  </Box>
                </Box>
              </>
            )}

            <Divider sx={styles.divider} />

            {/* Price Includes */}
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                sx={styles.priceIncludesTitle}
              >
                {t('booking.priceIncludes')}:
              </Typography>
              <Box sx={styles.priceIncludesContainer}>
                <Box sx={styles.priceIncludesItem}>
                  <CheckCircle sx={styles.checkIcon} />
                  <Typography variant="body2">
                    {t('booking.payedRoadTax')}
                  </Typography>
                </Box>
                <Box sx={styles.priceIncludesItem}>
                  <CheckCircle sx={styles.checkIcon} />
                  <Typography variant="body2">
                    {t('booking.insurance')}
                  </Typography>
                </Box>
                <Box sx={styles.priceIncludesItem}>
                  <CheckCircle sx={styles.checkIcon} />
                  <Typography variant="body2">
                    {t('booking.unlimitedMileage')}
                  </Typography>
                </Box>
                <Box sx={styles.priceIncludesItem}>
                  <CheckCircle sx={styles.checkIcon} />
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
