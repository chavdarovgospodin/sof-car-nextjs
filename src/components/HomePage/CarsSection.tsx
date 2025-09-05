'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from '@mui/material';
import { ChevronLeft, ChevronRight, DirectionsCar } from '@mui/icons-material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAllCars } from '../../hooks/useApi';
import type { CarData } from '../../types/api';

interface CarsSectionProps {
  currentLang: string;
}

export function CarsSection({ currentLang }: CarsSectionProps) {
  const { data: carsResponse, isLoading, error } = useAllCars();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const carsPerPage = 4;

  if (isLoading) {
    return (
      <Box
        id="offers"
        sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#f8f9fa' }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        id="offers"
        sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#f8f9fa' }}
      >
        <Container maxWidth="lg">
          <Alert severity="error">
            {currentLang === 'bg'
              ? 'Грешка при зареждане на автомобилите'
              : 'Error loading cars'}
          </Alert>
        </Container>
      </Box>
    );
  }

  const cars: CarData[] =
    carsResponse?.cars?.map((car) => ({
      ...car,
      imageUrl: car.image_url,
      available: true,
      features: car.features || [],
      price: car.price_per_day,
    })) || [];

  const totalPages = Math.ceil(cars.length / carsPerPage);
  const startIndex = currentPage * carsPerPage;
  const endIndex = startIndex + carsPerPage;
  const currentCars = cars.slice(startIndex, endIndex);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleBookCar = (carId: string) => {
    router.push(`/${currentLang}/booking?car_id=${carId}`);
  };

  const getClassColor = (carClass: string) => {
    switch (carClass) {
      case 'economy':
        return '#f2849e';
      case 'standard':
        return '#7ecaf6';
      case 'premium':
        return '#7bd0c1';
      default:
        return '#1976d2';
    }
  };

  const getClassLabel = (carClass: string) => {
    switch (carClass) {
      case 'economy':
        return currentLang === 'bg' ? 'Икономикачен' : 'Economy';
      case 'standard':
        return currentLang === 'bg' ? 'Стандартен' : 'Standard';
      case 'premium':
        return currentLang === 'bg' ? 'Луксозен' : 'Premium';
      default:
        return carClass;
    }
  };

  return (
    <Box
      id="offers"
      sx={{
        pt: { xs: 2, md: 4 },
        pb: { xs: 4, md: 8 },
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          {currentLang === 'bg' ? 'Нашите автомобили' : 'Our Cars'}
        </Typography>

        <Typography
          variant="h6"
          component="p"
          textAlign="center"
          sx={{ mb: 4, color: 'text.secondary' }}
        >
          {currentLang === 'bg'
            ? 'Разгледайте всички наши автомобили и изберете най-подходящия за вас'
            : 'Browse all our cars and choose the most suitable one for you'}
        </Typography>

        {/* Cars Gallery */}
        <Box sx={{ position: 'relative' }}>
          {/* Navigation Arrows */}
          <IconButton
            onClick={handlePrevious}
            disabled={currentPage === 0}
            sx={{
              position: 'absolute',
              left: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 2,
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
              '&:disabled': {
                opacity: 0.3,
              },
            }}
          >
            <ChevronLeft />
          </IconButton>

          <IconButton
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            sx={{
              position: 'absolute',
              right: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              zIndex: 2,
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
              '&:disabled': {
                opacity: 0.3,
              },
            }}
          >
            <ChevronRight />
          </IconButton>

          {/* Cars Grid */}
          <Grid container spacing={3}>
            {currentCars.map((car) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={car.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardMedia
                    sx={{
                      position: 'relative',
                      height: 200,
                      overflow: 'hidden',
                    }}
                  >
                    {car.image_url ? (
                      <Image
                        src={car.image_url}
                        alt={`${car.brand} ${car.model}`}
                        fill
                        style={{
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#f5f5f5',
                        }}
                      >
                        <DirectionsCar sx={{ fontSize: 60, color: '#ccc' }} />
                      </Box>
                    )}
                    <Chip
                      label={getClassLabel(car.class)}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: getClassColor(car.class),
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                      }}
                    />
                  </CardMedia>

                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                        lineHeight: 1.2,
                      }}
                    >
                      {car.brand} {car.model}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {car.year}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {(car.price_per_day * 1.96).toFixed(0)} лв/ден
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleBookCar(car.id.toString())}
                      sx={{
                        backgroundColor: '#1976d2',
                        '&:hover': {
                          backgroundColor: '#1565c0',
                        },
                        fontWeight: 'bold',
                      }}
                    >
                      {currentLang === 'bg' ? 'Резервирай' : 'Book Now'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                mt: 4,
                gap: 1,
              }}
            >
              {Array.from({ length: totalPages }, (_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: index === currentPage ? '#1976d2' : '#ccc',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor:
                        index === currentPage ? '#1976d2' : '#999',
                    },
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
