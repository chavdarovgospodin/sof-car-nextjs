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
import { useAllCars } from '../../../hooks/useApi';
import type { CarData } from '../../../types/api';
import { CarsSectionProps } from './CarsSection.types';
import { styles } from './CarsSection.styles';
import { useBreakpoint } from '../../../providers';
import { getCarsTexts, getClassLabel } from './CarsSection.const';

export function CarsSection({ currentLang }: CarsSectionProps) {
  const { data: carsResponse, isLoading, error } = useAllCars();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const { isMobile, isTablet } = useBreakpoint();
  const carsPerPage = isTablet || isMobile ? 1 : 2;

  const texts = getCarsTexts(currentLang);

  if (isLoading) {
    return (
      <Box id="offers" sx={styles.section}>
        <Container maxWidth="lg">
          <Box sx={styles.loadingContainer}>
            <CircularProgress />
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box id="offers" sx={styles.section}>
        <Container maxWidth="lg">
          <Alert severity="error">{texts.errorLoading}</Alert>
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

  return (
    <Box id="offers" sx={styles.section}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={styles.title}
        >
          {texts.title}
        </Typography>

        <Typography
          variant="h6"
          component="p"
          textAlign="center"
          sx={styles.subtitle}
        >
          {texts.subtitle}
        </Typography>

        {/* Cars Gallery */}
        <Box sx={styles.galleryContainer}>
          {/* Cars Grid */}
          <Grid container spacing={4} justifyContent="center">
            {!isMobile && (
              <>
                <IconButton
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  sx={styles.navButtonLeft}
                >
                  <ChevronLeft />
                </IconButton>

                <IconButton
                  onClick={handleNext}
                  disabled={currentPage === totalPages - 1}
                  sx={styles.navButtonRight}
                >
                  <ChevronRight />
                </IconButton>
              </>
            )}
            {currentCars.map((car) => (
              <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }} key={car.id}>
                <Paper elevation={0} sx={styles.carCard}>
                  {/* Navigation Arrows - Overlay on card */}
                  {totalPages > 1 && isMobile && (
                    <>
                      <IconButton
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                        sx={styles.mobileNavButtonLeft}
                      >
                        <ChevronLeft />
                      </IconButton>

                      <IconButton
                        onClick={handleNext}
                        disabled={currentPage === totalPages - 1}
                        sx={styles.mobileNavButtonRight}
                      >
                        <ChevronRight />
                      </IconButton>
                    </>
                  )}

                  {/* Year Badge */}
                  <Chip label={car.year} size="small" sx={styles.yearBadge} />

                  {/* Class Badge */}
                  <Chip
                    label={getClassLabel(car.class, currentLang)}
                    size="small"
                    sx={styles.classBadge}
                  />

                  <Box>
                    {/* Main Content Container */}
                    <Box sx={styles.mainContentContainer}>
                      {/* Left Side - Car Image */}
                      <Box sx={styles.imageContainer}>
                        {car.image_urls?.[0] ? (
                          <Image
                            src={car.image_urls[0]}
                            alt={`${car.brand} ${car.model}`}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        ) : (
                          <DirectionsCar sx={styles.placeholderIcon} />
                        )}
                      </Box>

                      <Box sx={styles.carInfoContainer}>
                        {/* Car Title */}
                        <Box>
                          <Typography
                            variant="h5"
                            component="h3"
                            sx={styles.carTitle}
                          >
                            {car.brand} {car.model}
                          </Typography>

                          {/* Car Specifications */}
                          <Box sx={styles.specificationsContainer}>
                            {/* Seats */}
                            <Box sx={styles.specItem}>
                              <People sx={styles.specIcon} />
                              <Typography variant="body2" sx={styles.specText}>
                                {texts.seats}
                              </Typography>
                            </Box>

                            {/* Transmission */}
                            <Box sx={styles.specItem}>
                              <Settings sx={styles.specIcon} />
                              <Typography variant="body2" sx={styles.specText}>
                                {car.transmission === 'manual'
                                  ? texts.manualTransmission
                                  : texts.automaticTransmission}
                              </Typography>
                            </Box>

                            {/* Mileage */}
                            <Box sx={styles.specItem}>
                              <Route sx={styles.specIcon} />
                              <Typography variant="body2" sx={styles.specText}>
                                {texts.unlimitedMileage}
                              </Typography>
                            </Box>

                            {/* Features */}
                            {car.features && car.features.length > 0 && (
                              <Box sx={styles.featuresContainer}>
                                <Typography
                                  variant="subtitle2"
                                  sx={styles.featuresTitle}
                                >
                                  {texts.features}
                                </Typography>
                                <Box sx={styles.featuresChips}>
                                  {car.features
                                    .slice(0, 3)
                                    .map((feature, index) => (
                                      <Chip
                                        key={index}
                                        label={feature}
                                        size="small"
                                        sx={styles.featureChip}
                                      />
                                    ))}
                                  {car.features.length > 3 && (
                                    <Tooltip
                                      title={
                                        <Box>
                                          <Typography
                                            variant="subtitle2"
                                            sx={styles.tooltipTitle}
                                          >
                                            {texts.features}
                                          </Typography>
                                          {car.features.map(
                                            (feature, index) => (
                                              <Typography
                                                key={index}
                                                variant="body2"
                                                sx={styles.tooltipItem}
                                              >
                                                • {feature}
                                              </Typography>
                                            )
                                          )}
                                        </Box>
                                      }
                                      arrow
                                      placement="top"
                                      sx={styles.tooltip}
                                    >
                                      <IconButton
                                        size="small"
                                        sx={styles.tooltipButton}
                                      >
                                        <Info sx={styles.tooltipIcon} />
                                      </IconButton>
                                    </Tooltip>
                                  )}
                                </Box>
                              </Box>
                            )}

                            {/* Price */}
                            <Box sx={styles.priceContainer}>
                              <Typography variant="h6" sx={styles.price}>
                                {texts.from} {car.price_per_day}лв/{texts.day}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={styles.priceSubtext}
                              >
                                {texts.includingTaxes}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>

                    {/* Book Button */}
                    <Box sx={styles.buttonContainer}>
                      <Button
                        variant="contained"
                        onClick={() => router.push(`/${currentLang}/booking`)}
                        sx={styles.bookButton}
                      >
                        {texts.seeAvailabilities}
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <Box sx={styles.paginationContainer}>
              {Array.from({ length: totalPages }, (_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentPage(index)}
                  sx={{
                    ...styles.paginationDot,
                    backgroundColor: index === currentPage ? '#1976d2' : '#ccc',
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

export default CarsSection;
