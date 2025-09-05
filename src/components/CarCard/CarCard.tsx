'use client';

import React from 'react';
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
} from '@mui/material';
import {
  DirectionsCar,
  CheckCircle,
  Euro,
  Security,
} from '@mui/icons-material';
import type { CarData } from '../../types/api';

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
          height: 200,
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {car.image_url ? (
          <Image
            src={car.image_url}
            alt={`${car.brand} ${car.model}`}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
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

        {car.features && car.features.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {car.features.slice(0, 6).join(', ')}
              {car.features.length > 6 && '...'}
            </Typography>
          </Box>
        )}

        <Divider sx={{ marginY: 1 }} />

        {/* Price Section */}
        <Box sx={{ marginBottom: 2 }}>
          {/* Daily Price */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem', marginBottom: 0.5 }}
          >
            {t('booking.pricePerDay')}: {(car.price_per_day * 1.96).toFixed(0)}{' '}
            лв / ≈{car.price_per_day.toFixed(2)} €
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
            {(totalPrice * 1.96).toFixed(0)} лв
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem' }}
          >
            <Euro sx={{ fontSize: 16, marginRight: 0.5 }} />≈{' '}
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
              {t('booking.depositRequired')}:{' '}
              {(car.deposit_amount * 1.96).toFixed(0)} лв / ≈
              {car.deposit_amount.toFixed(2)} €
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
    </Card>
  );
}
