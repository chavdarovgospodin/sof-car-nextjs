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
import type { CarData } from '../../types/api';
import { CarDetailsDialog } from './CarDetailsDialog';

interface CarCardProps {
  car: CarData;
  onBook: (car: CarData) => void;
  t: (key: string, values?: Record<string, unknown>) => string;
  rentalDates?: {
    start: Date | null;
    end: Date | null;
  };
}

export function CarCard({ car, onBook, t, rentalDates }: CarCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calculate total price for the rental period
  const calculateTotalPrice = () => {
    if (!rentalDates?.start || !rentalDates?.end) {
      return car.price_per_day; // Return daily price if no dates
    }

    const diffTime = Math.abs(
      rentalDates.end.getTime() - rentalDates.start.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return car.price_per_day * diffDays;
  };

  const totalPrice = calculateTotalPrice();
  const totalDays =
    rentalDates?.start && rentalDates?.end
      ? Math.ceil(
          Math.abs(rentalDates.end.getTime() - rentalDates.start.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 1;

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: 400,
        height: 'fit-content',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
        position: 'relative',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: -10,
          left: 20,
          zIndex: 2,
        }}
      >
        <Chip
          label={car.class}
          color="primary"
          size="small"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>

      {/* Car Image */}
      <Box
        sx={{
          position: 'relative',
          height: 250,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
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
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    borderRadius: '50%',
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 2,
                  }}
                >
                  <ZoomIn sx={{ fontSize: 30 }} />
                </Box>
              </Box>
            </Fade>
            <Box
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                zIndex: 2,
                display: { xs: 'block', md: 'none' }, // Само на mobile
              }}
            >
              <IconButton
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': {
                      transform: 'scale(1)',
                      opacity: 0.8,
                    },
                    '50%': {
                      transform: 'scale(1.1)',
                      opacity: 1,
                    },
                    '100%': {
                      transform: 'scale(1)',
                      opacity: 0.8,
                    },
                  },
                }}
              >
                <ZoomIn sx={{ fontSize: 18, color: '#1976d2' }} />
              </IconButton>
            </Box>
          </>
        ) : (
          <DirectionsCar sx={{ fontSize: 80, color: '#ccc' }} />
        )}
      </Box>

      <CardContent sx={{ padding: 2, flexGrow: 1 }}>
        {/* Car Title */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 'bold',
            marginBottom: 1,
            color: '#1976d2',
          }}
        >
          {car.brand} {car.model} - {car.year}
        </Typography>

        {/* Structured Features with Icons */}
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            alignItems: 'center',
          }}
        >
          {/* Seats */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Person sx={{ fontSize: 16, color: '#666' }} />
            <Typography variant="caption" color="text.secondary">
              {car.seats || 5} {t('booking.seats')}
            </Typography>
          </Box>

          {/* Transmission */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <DriveEta sx={{ fontSize: 16, color: '#666' }} />
            <Typography variant="caption" color="text.secondary">
              {car.transmission === 'automatic'
                ? t('booking.automaticTransmission')
                : t('booking.manualTransmission')}
            </Typography>
          </Box>

          {/* Luggage */}
          {(car.large_luggage || car.small_luggage) && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Luggage sx={{ fontSize: 16, color: '#666' }} />
              <Typography variant="caption" color="text.secondary">
                {car.large_luggage && car.small_luggage
                  ? `${t('booking.largeLuggage')} x${car.large_luggage}, ${t(
                      'booking.smallLuggage'
                    )} x${car.small_luggage}`
                  : car.large_luggage
                  ? `${t('booking.largeLuggage')} x${car.large_luggage}`
                  : `${t('booking.smallLuggage')} x${car.small_luggage}`}
              </Typography>
            </Box>
          )}

          {/* AC */}
          {car.ac && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AcUnit sx={{ fontSize: 16, color: '#666' }} />
              <Typography variant="caption" color="text.secondary">
                {t('booking.ac')}
              </Typography>
            </Box>
          )}

          {/* 4WD */}
          {car.four_wd && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <DirectionsCar sx={{ fontSize: 16, color: '#666' }} />
              <Typography variant="caption" color="text.secondary">
                {t('booking.fourWd')}
              </Typography>
            </Box>
          )}

          {/* Custom Features - if any */}
          {car.features && car.features.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                {car.features.slice(0, 2).join(', ')}
                {car.features.length > 2 && '...'}
              </Typography>
              {car.features.length > 2 && (
                <Tooltip
                  title={
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 'bold', mb: 1 }}
                      >
                        {t('booking.possibilities')}:
                      </Typography>
                      {car.features.map((feature, index) => (
                        <Typography
                          key={index}
                          variant="body2"
                          sx={{ mb: 0.5 }}
                        >
                          • {feature}
                        </Typography>
                      ))}
                    </Box>
                  }
                  arrow
                  placement="top"
                  sx={{
                    '& .MuiTooltip-tooltip': {
                      maxWidth: 300,
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    },
                  }}
                >
                  <IconButton size="small" sx={{ p: 0.5 }}>
                    <Info sx={{ fontSize: 16, color: 'primary.main' }} />
                  </IconButton>
                </Tooltip>
              )}
            </Box>
          )}
        </Box>

        <Divider sx={{ marginY: 1 }} />

        {/* Price Section */}
        <Box sx={{ marginBottom: 2 }}>
          {/* Daily Price */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem', marginBottom: 0.5 }}
          >
            {t('booking.pricePerDay')}: {car.price_per_day.toFixed(0)} лв / ≈
            {(car.price_per_day / 1.96).toFixed(2)} €
          </Typography>

          {/* Total Price */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {totalPrice.toFixed(0)} лв
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem' }}
          >
            <Euro sx={{ fontSize: 16, marginRight: 0.5 }} /> ≈{' '}
            {totalPrice.toFixed(2)} € за {totalDays}{' '}
            {totalDays === 1 ? 'ден' : 'дни'}
          </Typography>

          {/* Deposit Amount */}
          <Box
            sx={{
              marginTop: 1,
              padding: 1,
              backgroundColor: '#fff3e0',
              borderRadius: 1,
              border: '1px solid #ffb74d',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 'bold',
                color: '#e65100',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              <Security sx={{ fontSize: 16 }} />
              {t('booking.depositRequired')}: {car.deposit_amount.toFixed(0)} лв
              / ≈ {(car.deposit_amount / 1.96).toFixed(2)} €
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontSize: '0.7rem', display: 'block', marginTop: 0.5 }}
            >
              {t('booking.depositInfo')}
            </Typography>
          </Box>
        </Box>

        {/* Price Inclusions */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 1, fontWeight: 500 }}
          >
            {t('booking.priceIncludes')}:
          </Typography>
          <Grid container spacing={1}>
            <Grid size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                <Typography variant="body2" fontSize="0.75rem">
                  {t('booking.unlimitedMileage')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                <Typography variant="body2" fontSize="0.75rem">
                  {t('booking.insurance')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                <Typography variant="body2" fontSize="0.75rem">
                  {t('booking.assistance')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                <Typography variant="body2" fontSize="0.75rem">
                  {t('booking.fuel')}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>

      <CardActions sx={{ padding: 2, paddingTop: 0 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onBook(car)}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
            height: 48,
            fontWeight: 'bold',
          }}
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
