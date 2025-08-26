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
import { DirectionsCar, CheckCircle, Euro } from '@mui/icons-material';
import { CarData } from '../../services/googleSheets';

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
      return car.price; // Return daily price if no dates
    }

    const diffTime = Math.abs(
      rentalDates.end.getTime() - rentalDates.start.getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return car.price * diffDays;
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
        {car.imageUrl ? (
          <Image
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
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
          {car.make} {car.model}
        </Typography>

        {/* Car Class and Year */}
        <Box sx={{ display: 'flex', gap: 2, marginBottom: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t('booking.class')}: {car.class}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t('booking.year')}: {car.year}
          </Typography>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            marginBottom: 2,
            minHeight: '3em',
            lineHeight: 1.4,
          }}
        >
          {car.description}
        </Typography>

        <Divider sx={{ marginY: 1 }} />

        {/* Price Section */}
        <Box sx={{ marginBottom: 2 }}>
          {/* Daily Price */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem', marginBottom: 0.5 }}
          >
            {t('booking.pricePerDay')}: {(car.price * 1.96).toFixed(0)} лв / ≈
            {car.price.toFixed(2)} €
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
