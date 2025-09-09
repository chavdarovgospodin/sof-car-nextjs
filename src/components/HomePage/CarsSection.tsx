'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Button,
  IconButton,
  Paper,
  Chip,
  useMediaQuery,
  useTheme,
  Alert,
  Tooltip,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  DirectionsCar,
  People,
  Settings,
  Route,
  Info,
} from '@mui/icons-material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallDevice = useMediaQuery('(max-width: 414px)');
  const carsPerPage = isMobile ? 1 : 2;

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
    (carsResponse &&
      carsResponse?.cars.map((car) => ({
        ...car,
        imageUrl: car.image_urls?.[0] || null,
        available: true,
        features: car.features || [],
        price: car.price_per_day,
      }))) ||
    [];

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

  const getClassLabel = (carClass: string) => {
    switch (carClass) {
      case 'economy':
        return currentLang === 'bg' ? 'Икономичен' : 'Economy';
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
          {/* Cars Grid */}
          <Grid container spacing={4} justifyContent="center">
            {!isMobile && (
              <>
                <IconButton
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  sx={{
                    position: 'absolute',
                    left: 8,
                    top: '50%',
                    transform: 'translateY(-50%) translateX(-150%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 3,
                    width: 40,
                    height: 40,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
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
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%) translateX(150%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 3,
                    width: 40,
                    height: 40,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 1)',
                    },
                    '&:disabled': {
                      opacity: 0.3,
                    },
                  }}
                >
                  <ChevronRight />
                </IconButton>
              </>
            )}
            {currentCars.map((car) => (
              <Grid size={{ xs: 12, sm: 6, md: 6 }} key={car.id}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    backgroundColor: 'white',
                    border: '1px solid #e5e5e5',
                    overflow: 'hidden',
                    position: 'relative',
                    minHeight: 220,
                  }}
                >
                  {/* Navigation Arrows - Overlay on card */}
                  {totalPages > 1 && isMobile && (
                    <>
                      <IconButton
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                        sx={{
                          position: 'absolute',
                          left: 8,
                          top: '25%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          zIndex: 3,
                          width: 40,
                          height: 40,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
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
                          right: 8,
                          top: '25%',
                          transform: 'translateY(-50%)',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          zIndex: 3,
                          width: 40,
                          height: 40,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                          },
                          '&:disabled': {
                            opacity: 0.3,
                          },
                        }}
                      >
                        <ChevronRight />
                      </IconButton>
                    </>
                  )}
                  {/* Year Badge в горния ляв ъгъл */}
                  <Chip
                    label={car.year}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 6,
                      left: 16,
                      backgroundColor: '#5C9CDB',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      height: 26,
                      borderRadius: 1.5,
                      zIndex: 2,
                      '& .MuiChip-label': {
                        px: 1.2,
                      },
                    }}
                  />

                  {/* Class Badge в горния десен ъгъл */}
                  <Chip
                    label={getClassLabel(car.class)}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 6,
                      right: 16,
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      height: 26,
                      borderRadius: 1.5,
                      zIndex: 2,
                      '& .MuiChip-label': {
                        px: 1.2,
                      },
                    }}
                  />
                  <Box>
                    {/* Main Content Container */}
                    <Box
                      sx={{
                        display: { xs: 'flex', sm: 'grid' },
                        flexDirection: { xs: 'column', sm: 'row' },
                        gridTemplateColumns: { xs: 'none', sm: '60% 40%' },
                        p: 2,
                        pt: 5,
                        pb: 0,
                        gap: 3,
                        flex: 1,
                      }}
                    >
                      {/* Left Side - Car Image */}
                      <Box
                        sx={{
                          width: isSmallDevice
                            ? '100%'
                            : { xs: '100%', sm: 320 },
                          height: isSmallDevice ? 200 : { xs: 250, sm: 220 },
                          position: 'relative',
                          backgroundColor: '#fafafa',
                          borderRadius: 2,
                          overflow: 'hidden',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {car.image_urls?.[0] ? (
                          <Image
                            src={car.image_urls[0]}
                            alt={`${car.brand} ${car.model}`}
                            fill
                            style={{
                              objectFit: 'cover',
                            }}
                          />
                        ) : (
                          <DirectionsCar
                            sx={{ fontSize: 40, color: '#d0d0d0' }}
                          />
                        )}
                      </Box>

                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          minWidth: 0,
                        }}
                      >
                        {/* Car Title */}
                        <Box>
                          <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                              fontSize: '1.3rem',
                              fontWeight: 600,
                              color: '#333',
                              lineHeight: 1.2,
                              mb: 2,
                            }}
                          >
                            {car.brand} {car.model}
                          </Typography>

                          {/* Car Specifications */}
                          <Box sx={{ mb: 2 }}>
                            {/* Seats */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <People
                                sx={{
                                  fontSize: '1.1rem',
                                  color: '#888',
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'black',
                                  fontSize: '0.9rem',
                                  fontWeight: 400,
                                }}
                              >
                                {currentLang === 'bg' ? '5 места' : '5 seats'}
                              </Typography>
                            </Box>

                            {/* Transmission */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 1,
                              }}
                            >
                              <Settings
                                sx={{
                                  fontSize: '1.1rem',
                                  color: '#888',
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'black',
                                  fontSize: '0.9rem',
                                  fontWeight: 400,
                                }}
                              >
                                {car.transmission === 'manual'
                                  ? currentLang === 'bg'
                                    ? 'Ръчни скорости'
                                    : 'Manual'
                                  : currentLang === 'bg'
                                  ? 'Автоматични скорости'
                                  : 'Automatic'}
                              </Typography>
                            </Box>

                            {/* Mileage */}
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                mb: 1.5,
                              }}
                            >
                              <Route
                                sx={{
                                  fontSize: '1.1rem',
                                  color: '#888',
                                }}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  color: 'black',
                                  fontSize: '0.9rem',
                                  fontWeight: 400,
                                }}
                              >
                                {currentLang === 'bg'
                                  ? 'Неограничен пробег'
                                  : 'Unlimited mileage'}
                              </Typography>
                            </Box>

                            {/* Features */}
                            {car.features && car.features.length > 0 && (
                              <Box sx={{ mb: 2 }}>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    color: '#666',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    mb: 1,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                  }}
                                >
                                  {currentLang === 'bg'
                                    ? 'Възможности'
                                    : 'Features'}
                                </Typography>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: 0.5,
                                  }}
                                >
                                  {car.features
                                    .slice(0, 3)
                                    .map((feature, index) => (
                                      <Chip
                                        key={index}
                                        label={feature}
                                        size="small"
                                        sx={{
                                          backgroundColor: '#f0f0f0',
                                          color: '#333',
                                          fontSize: '0.7rem',
                                          height: 20,
                                          '& .MuiChip-label': {
                                            px: 0.8,
                                          },
                                        }}
                                      />
                                    ))}
                                  {car.features.length > 3 && (
                                    <Tooltip
                                      title={
                                        <Box>
                                          <Typography
                                            variant="subtitle2"
                                            sx={{ fontWeight: 'bold', mb: 1 }}
                                          >
                                            {currentLang === 'bg'
                                              ? 'Възможности'
                                              : 'Features'}
                                          </Typography>
                                          {car.features.map(
                                            (feature, index) => (
                                              <Typography
                                                key={index}
                                                variant="body2"
                                                sx={{ mb: 0.5 }}
                                              >
                                                • {feature}
                                              </Typography>
                                            )
                                          )}
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
                                        <Info
                                          sx={{
                                            fontSize: 16,
                                            color: 'primary.main',
                                          }}
                                        />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                </Box>
                              </Box>
                            )}

                            {/* Price */}
                            <Box sx={{ mb: 2 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: '#1976d2',
                                  fontSize: '1.2rem',
                                  fontWeight: 700,
                                  mb: 0.5,
                                }}
                              >
                                {currentLang === 'bg' ? 'От' : 'From'}{' '}
                                {car.price_per_day}лв/
                                {currentLang === 'bg' ? 'ден' : 'day'}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: '#666',
                                  fontSize: '0.8rem',
                                }}
                              >
                                {currentLang === 'bg'
                                  ? 'включва всички данъци'
                                  : 'including all taxes'}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    {/* Book Button */}
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 2,
                      }}
                    >
                      <Button
                        variant="contained"
                        onClick={() => router.push(`/${currentLang}/booking`)}
                        sx={{
                          backgroundColor: '#1976d2',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.9rem',
                          py: 1.2,
                          px: 3,
                          width: '250px',
                          borderRadius: 2,
                          textTransform: 'none',
                          boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)',
                          '&:hover': {
                            backgroundColor: '#1565c0',
                            boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                          },
                        }}
                      >
                        {currentLang === 'bg'
                          ? 'Вижте наличности'
                          : 'See Availabilities'}
                      </Button>
                    </Box>
                  </Box>
                </Paper>
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
