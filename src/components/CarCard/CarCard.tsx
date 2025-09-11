'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  Divider,
  Tooltip,
  IconButton,
  Fade,
} from '@mui/material';
import {
  DirectionsCar,
  CheckCircle,
  Euro,
  Security,
  Info,
  ZoomIn,
  DriveEta,
  Luggage,
  AcUnit,
  Person,
} from '@mui/icons-material';
import { CarDetailsDialog } from './CarDetailsDialog';
import { CarCardProps } from './CarCard.types';
import { styles } from './CarCard.styles';
import {
  calculateTotalPrice,
  calculateTotalDays,
  getTransmissionText,
  getLuggageText,
  getCustomFeaturesText,
} from './CarCard.const';

export function CarCard({ car, onBook, t, rentalDates }: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPrice = calculateTotalPrice(car, rentalDates);
  const totalDays = calculateTotalDays(rentalDates);

  return (
    <Card sx={styles.card}>
      {/* Header Badge */}
      <Box sx={styles.headerBadge}>
        <Chip label={car.class} color="primary" size="small" sx={styles.chip} />
      </Box>

      {/* Car Image */}
      <Box
        sx={styles.imageContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
      >
        {car.image_urls?.[0] ? (
          <>
            <Image
              src={car.image_urls[0]}
              alt={`${car.brand} ${car.model}`}
              fill
              style={{
                objectFit: 'cover',
                opacity: isHovered ? 0.7 : 1,
                transition: 'opacity 0.3s ease',
              }}
            />

            {/* Hover overlay with zoom icon */}
            <Fade in={isHovered}>
              <Box sx={styles.hoverOverlay}>
                <Box sx={styles.zoomIconContainer}>
                  <ZoomIn sx={{ fontSize: 30 }} />
                </Box>
              </Box>
            </Fade>
            <Box sx={styles.mobileZoomButton}>
              <IconButton size="small" sx={styles.mobileZoomIcon}>
                <ZoomIn sx={{ fontSize: 18, color: '#1976d2' }} />
              </IconButton>
            </Box>
          </>
        ) : (
          <DirectionsCar sx={styles.placeholderIcon} />
        )}
      </Box>

      <CardContent sx={styles.cardContent}>
        {/* Car Title */}
        <Typography variant="h6" component="h3" sx={styles.carTitle}>
          {car.brand} {car.model} - {car.year}
        </Typography>

        {/* Structured Features with Icons */}
        <Box sx={styles.featuresContainer}>
          {/* Seats */}
          <Box sx={styles.featureItem}>
            <Person sx={styles.featureIcon} />
            <Typography variant="caption" color="text.secondary">
              {car.seats || 5} {t('booking.seats')}
            </Typography>
          </Box>

          {/* Transmission */}
          <Box sx={styles.featureItem}>
            <DriveEta sx={styles.featureIcon} />
            <Typography variant="caption" color="text.secondary">
              {getTransmissionText(car.transmission || 'manual', t)}
            </Typography>
          </Box>

          {/* Luggage */}
          {getLuggageText(car, t) && (
            <Box sx={styles.featureItem}>
              <Luggage sx={styles.featureIcon} />
              <Typography variant="caption" color="text.secondary">
                {getLuggageText(car, t)}
              </Typography>
            </Box>
          )}

          {/* AC */}
          {car.ac && (
            <Box sx={styles.featureItem}>
              <AcUnit sx={styles.featureIcon} />
              <Typography variant="caption" color="text.secondary">
                {t('booking.ac')}
              </Typography>
            </Box>
          )}

          {/* 4WD */}
          {car.four_wd && (
            <Box sx={styles.featureItem}>
              <DirectionsCar sx={styles.featureIcon} />
              <Typography variant="caption" color="text.secondary">
                {t('booking.fourWd')}
              </Typography>
            </Box>
          )}

          {/* Custom Features - if any */}
          {car.features && car.features.length > 0 && (
            <Box sx={styles.customFeaturesItem}>
              <Typography variant="caption" color="text.secondary">
                {getCustomFeaturesText(car.features)}
              </Typography>
              {car.features.length > 2 && (
                <Tooltip
                  title={
                    <Box>
                      <Typography variant="subtitle2" sx={styles.tooltipTitle}>
                        {t('booking.possibilities')}:
                      </Typography>
                      {car.features.map((feature, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={styles.tooltipItem}
                        >
                          • {feature}
                        </Typography>
                      ))}
                    </Box>
                  }
                  arrow
                  placement="top"
                  sx={styles.tooltip}
                >
                  <IconButton size="small" sx={styles.infoButton}>
                    <Info sx={styles.infoIcon} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )}
        </Box>

        <Divider sx={styles.divider} />

        {/* Price Section */}
        <Box sx={styles.priceSection}>
          {/* Daily Price */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={styles.dailyPrice}
          >
            {t('booking.pricePerDay')}: {car.price_per_day.toFixed(0)} лв / ≈
            {(car.price_per_day / 1.96).toFixed(2)} €
          </Typography>

          {/* Total Price */}
          <Typography variant="h5" component="div" sx={styles.totalPrice}>
            {totalPrice.toFixed(0)} лв
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={styles.totalPriceText}
          >
            <Euro sx={styles.euroIcon} /> ≈ {totalPrice.toFixed(2)} € за{' '}
            {totalDays} {totalDays === 1 ? 'ден' : 'дни'}
          </Typography>

          {/* Deposit Amount */}
          <Box sx={styles.depositContainer}>
            <Typography variant="body2" sx={styles.depositText}>
              <Security sx={styles.securityIcon} />
              {t('booking.depositRequired')}: {car.deposit_amount.toFixed(0)} лв
              / ≈ {(car.deposit_amount / 1.96).toFixed(2)} €
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={styles.depositInfo}
            >
              {t('booking.depositInfo')}
            </Typography>
          </Box>
        </Box>

        {/* Price Inclusions */}
        <Box sx={styles.priceIncludesContainer}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={styles.priceIncludesTitle}
          >
            {t('booking.priceIncludes')}:
          </Typography>
          <Grid container spacing={1}>
            <Grid size={{ xs: 6 }}>
              <Box sx={styles.priceIncludesItem}>
                <CheckCircle sx={styles.checkIcon} />
                <Typography variant="body2" sx={styles.priceIncludesText}>
                  {t('booking.unlimitedMileage')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box sx={styles.priceIncludesItem}>
                <CheckCircle sx={styles.checkIcon} />
                <Typography variant="body2" sx={styles.priceIncludesText}>
                  {t('booking.insurance')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box sx={styles.priceIncludesItem}>
                <CheckCircle sx={styles.checkIcon} />
                <Typography variant="body2" sx={styles.priceIncludesText}>
                  {t('booking.assistance')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box sx={styles.priceIncludesItem}>
                <CheckCircle sx={styles.checkIcon} />
                <Typography variant="body2" sx={styles.priceIncludesText}>
                  {t('booking.fuel')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>

      <CardActions sx={styles.cardActions}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onBook(car)}
          sx={styles.bookButton}
        >
          {t('booking.bookButton')}
        </Button>
      </CardActions>

      {/* Car Details Dialog */}
      <CarDetailsDialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        car={car}
        t={t}
      />
    </Card>
  );
}
