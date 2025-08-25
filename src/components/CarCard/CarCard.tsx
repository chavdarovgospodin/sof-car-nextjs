'use client';

import React from 'react';
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
}

export function CarCard({ car, onBook, t }: CarCardProps) {
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
          <img
            src={car.imageUrl}
            alt={`${car.make} ${car.model}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
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

        {/* Car Class */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: 1 }}
        >
          {t('class')}: {car.class}
        </Typography>

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
            {(car.price * 1.96).toFixed(0)} лв
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem' }}
          >
            <Euro sx={{ fontSize: 16, marginRight: 0.5 }} />≈{' '}
            {car.price.toFixed(2)} €
          </Typography>
        </Box>

        {/* Price Inclusions */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: 1, fontWeight: 500 }}
          >
            {t('priceIncludes')}:
          </Typography>
          <Grid container spacing={1}>
            <Grid size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                <Typography variant="body2" fontSize="0.75rem">
                  {t('unlimitedMileage')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                <Typography variant="body2" fontSize="0.75rem">
                  {t('insurance')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                <Typography variant="body2" fontSize="0.75rem">
                  {t('assistance')}
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                <Typography variant="body2" fontSize="0.75rem">
                  {t('fuel')}
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
          {t('bookButton')}
        </Button>
      </CardActions>
    </Card>
  );
}
