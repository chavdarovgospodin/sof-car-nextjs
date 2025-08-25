'use client';

import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import Image from 'next/image';

interface CarsSectionProps {
  currentLang: string;
}

export function CarsSection({ currentLang }: CarsSectionProps) {
  return (
    <Box id="offers" sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#f8f9fa' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          {currentLang === 'bg' ? 'Нашите автомобили' : 'Our Cars'}
        </Typography>

        <Typography
          variant="h6"
          component="p"
          textAlign="center"
          sx={{ mb: 6, color: 'text.secondary' }}
        >
          {currentLang === 'bg'
            ? 'Разгледайте нашите предложения за изгодни коли под наем разделени в 3 различни категории'
            : 'Explore our affordable car rental offers divided into 3 different categories'}
        </Typography>

        {/* Car Category Tiles */}
        <Grid container spacing={4}>
          {/* Economy Class */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover .image-container': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.5s ease',
                },
                '&:hover .overlay': {
                  backgroundColor: '#333333',
                  opacity: 0.35,
                  transition: 'background-color 0.5s ease, opacity 0.5s ease',
                },
                '&:hover .description': {
                  maxHeight: '12em',
                  opacity: 1,
                  transition: 'max-height 0.5s ease, opacity 0.5s ease',
                },
              }}
            >
              <Box className="image-container" sx={{ position: 'relative' }}>
                <Image
                  src="/rent-corsa.webp"
                  alt="Economy car rental"
                  width={400}
                  height={300}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#f2849e',
                    opacity: 0.6,
                    zIndex: 1,
                    transition: 'background-color 0.5s ease, opacity 0.5s ease',
                  }}
                />
                <Box
                  className="content"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    p: 3,
                    zIndex: 3,
                    transition: 'all 0.5s ease',
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                  >
                    {currentLang === 'bg'
                      ? 'Икономикачен клас'
                      : 'Economy Class'}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: '1.1rem', fontWeight: '600' }}
                  >
                    {currentLang === 'bg' ? 'Цени от:' : 'Prices from:'}{' '}
                    <strong>BGN 30.00</strong>{' '}
                    {currentLang === 'bg' ? 'на ден' : 'per day'}
                  </Typography>
                  <Box
                    className="description"
                    sx={{
                      maxHeight: 0,
                      opacity: 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.5s ease, opacity 0.5s ease',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.9rem', lineHeight: 1.4 }}
                    >
                      {currentLang === 'bg'
                        ? 'Малки, практични и лесни за паркиране, колите от икономичен клас са идеални за шофиране по натоварените улици на големия град'
                        : 'Small, practical and easy to park, economy class cars are ideal for driving on busy city streets'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Standard Class */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover .image-container': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.5s ease',
                },
                '&:hover .overlay': {
                  backgroundColor: '#333333',
                  opacity: 0.35,
                  transition: 'background-color 0.8s ease, opacity 0.8s ease',
                },
                '&:hover .description': {
                  maxHeight: '12em',
                  opacity: 1,
                  transition: 'max-height 0.8s ease, opacity 0.8s ease',
                },
              }}
            >
              <Box className="image-container" sx={{ position: 'relative' }}>
                <Image
                  src="/rent-octavia.webp"
                  alt="Standard car rental"
                  width={400}
                  height={300}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#7ecaf6',
                    opacity: 0.6,
                    zIndex: 1,
                    transition: 'background-color 0.8s ease, opacity 0.8s ease',
                  }}
                />
                <Box
                  className="content"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    p: 3,
                    zIndex: 3,
                    transition: 'all 0.5s ease',
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                  >
                    {currentLang === 'bg'
                      ? 'Стандартен клас'
                      : 'Standard Class'}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: '1.1rem', fontWeight: '600' }}
                  >
                    {currentLang === 'bg' ? 'Цени от:' : 'Prices from:'}{' '}
                    <strong>BGN 50.00</strong>{' '}
                    {currentLang === 'bg' ? 'на ден' : 'per day'}
                  </Typography>
                  <Box
                    className="description"
                    sx={{
                      maxHeight: 0,
                      opacity: 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.8s ease, opacity 0.8s ease',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.9rem', lineHeight: 1.4 }}
                    >
                      {currentLang === 'bg'
                        ? 'Стандартните коли са големи и удобни - идеални за семейни почивки и шофиране на голямо разстояние'
                        : 'Standard cars are large and comfortable - ideal for family vacations and long-distance driving'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Premium Class */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover .image-container': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.5s ease',
                },
                '&:hover .overlay': {
                  backgroundColor: '#333333',
                  opacity: 0.35,
                  transition: 'background-color 0.5s ease, opacity 0.5s ease',
                },
                '&:hover .description': {
                  maxHeight: '12em',
                  opacity: 1,
                  transition: 'max-height 0.5s ease, opacity 0.5s ease',
                },
              }}
            >
              <Box className="image-container" sx={{ position: 'relative' }}>
                <Image
                  src="/rent-arteon.webp"
                  alt="Premium car rental"
                  width={400}
                  height={300}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: '#7bd0c1',
                    opacity: 0.6,
                    zIndex: 1,
                    transition: 'background-color 0.8s ease, opacity 0.8s ease',
                  }}
                />
                <Box
                  className="content"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    textAlign: 'center',
                    p: 3,
                    zIndex: 3,
                    transition: 'all 0.5s ease',
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
                  >
                    {currentLang === 'bg' ? 'Луксозен клас' : 'Premium Class'}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontSize: '1.1rem', fontWeight: '600' }}
                  >
                    {currentLang === 'bg' ? 'Цени от:' : 'Prices from:'}{' '}
                    <strong>BGN 80.00</strong>{' '}
                    {currentLang === 'bg' ? 'на ден' : 'per day'}
                  </Typography>
                  <Box
                    className="description"
                    sx={{
                      maxHeight: 0,
                      opacity: 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.5s ease, opacity 0.5s ease',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.9rem', lineHeight: 1.4 }}
                    >
                      {currentLang === 'bg'
                        ? 'Пристигате на мястоназначението си в удобство и лукс - в представителен автомобил от бизнес клас'
                        : 'Arrive at your destination in comfort and luxury - in a representative business class vehicle'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
