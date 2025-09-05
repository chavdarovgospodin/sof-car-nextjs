'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  WhatsApp,
  Phone,
  Email,
  LocationOn,
  Lock,
  Security,
  CreditCard,
  Nature,
} from '@mui/icons-material';
import { APP_CONFIG } from '@/utils/constants';
import { useTranslations } from '@/hooks/useTranslations';

export function Footer() {
  const { currentLang } = useTranslations();

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'white',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Grid container spacing={4} sx={{ justifyContent: 'space-between' }}>
          {/* Company Info */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'primary.main' }}
            >
              {APP_CONFIG.name}
            </Typography>
            <Typography variant="body2" paragraph>
              {currentLang === 'bg'
                ? 'Изгодни и надеждни автомобили под наем за град Ямбол и цялата страна.'
                : 'Affordable and reliable car rental service in Yambol and throughout the country.'}
            </Typography>

            {/* Contact Info */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Phone sx={{ fontSize: 20, color: 'primary.main' }} />
              <Link
                href={`tel:${APP_CONFIG.phone}`}
                color="inherit"
                underline="hover"
              >
                {APP_CONFIG.phone}
              </Link>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Email sx={{ fontSize: 20, color: 'primary.main' }} />
              <Link
                href={`mailto:${APP_CONFIG.email}`}
                color="inherit"
                underline="hover"
              >
                {APP_CONFIG.email}
              </Link>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <LocationOn sx={{ fontSize: 20, color: 'primary.main' }} />
              <Typography variant="body2">{APP_CONFIG.address}</Typography>
            </Box>
          </Grid>

          {/* Social Media & Contact */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: 'primary.main' }}
            >
              {currentLang === 'bg' ? 'Свържете се с нас' : 'Connect with us'}
            </Typography>

            {/* Social Media Icons */}
            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
              <IconButton
                href="https://www.facebook.com/profile.php?id=61557338374090"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'primary.main',
                  },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                href="https://www.instagram.com/sof_car_rental"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'primary.main',
                  },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                href="viber://chat?number=+359879994212"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'primary.main !important',
                  },
                }}
              >
                <Box
                  component="img"
                  src="/viber-svgrepo-com.svg"
                  alt="Viber"
                  sx={{
                    width: 20,
                    height: 20,
                    filter: 'brightness(0) invert(1)', // Makes the icon white
                  }}
                />
              </IconButton>
              <IconButton
                href={`https://wa.me/359879994212`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'primary.main',
                  },
                }}
              >
                <WhatsApp />
              </IconButton>
            </Box>

            {/* Business Hours */}
            <Typography variant="body2" paragraph>
              <strong>
                {currentLang === 'bg' ? 'Работно време:' : 'Business Hours:'}
              </strong>
            </Typography>
            <Typography variant="body2" paragraph>
              {currentLang === 'bg'
                ? 'Понеделник - Петък: 8:00 - 18:00'
                : 'Monday - Friday: 8:00 AM - 6:00 PM'}
            </Typography>
            <Typography variant="body2">
              {currentLang === 'bg'
                ? 'Събота: 9:00 - 16:00'
                : 'Saturday: 9:00 AM - 4:00 PM'}
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: 1,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            pt: 3,
            mt: 4,
            fontSize: '13px',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" color="grey.400">
                © {currentYear} <strong>Sof Car Rental</strong>.{' '}
                {currentLang === 'bg'
                  ? 'Всички права запазени.'
                  : 'All Rights Reserved.'}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: { xs: 'center', md: 'flex-end' },
                }}
              >
                <Link
                  href={`/${currentLang}/privacy-policy`}
                  color="grey.400"
                  underline="hover"
                  sx={{ '&:hover': { color: 'white' } }}
                >
                  {currentLang === 'bg'
                    ? 'Политика за поверителност'
                    : 'Privacy Policy'}
                </Link>
                <Link
                  href={`/${currentLang}/terms-conditions`}
                  color="grey.400"
                  underline="hover"
                  sx={{ '&:hover': { color: 'white' } }}
                >
                  {currentLang === 'bg' ? 'Общи условия' : 'Terms & Conditions'}
                </Link>
                <Link
                  href={`/${currentLang}/pricing`}
                  color="grey.400"
                  underline="hover"
                  sx={{ '&:hover': { color: 'white' } }}
                >
                  {currentLang === 'bg' ? 'Цени и тарифи' : 'Pricing'}
                </Link>
                <Link
                  href={`/${currentLang}/services`}
                  color="grey.400"
                  underline="hover"
                  sx={{ '&:hover': { color: 'white' } }}
                >
                  {currentLang === 'bg'
                    ? 'Услуги и автомобили'
                    : 'Services & Cars'}
                </Link>
              </Box>
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 2,
              }}
            >
              <Typography
                sx={{ fontSize: '11px' }}
                variant="body2"
                color="grey.400"
                textAlign="center"
              >
                {currentLang === 'bg' ? 'Дизайн от' : 'Designed by'}{' '}
                <Link
                  href="https://www.linkedin.com/in/gospodin-chavdarov-ab2435158/"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="grey.400"
                  underline="hover"
                  sx={{ '&:hover': { color: 'white' } }}
                >
                  Gospodin Chavdarov
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Payment Methods Section */}
      <Box
        sx={{
          py: 2,
          background: 'linear-gradient(359deg, #4c5c85 0%, #c2fbff 100%)',
          borderTop: '1px solid #e0e0e0',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 1, sm: 2, md: 3 },
              flexWrap: 'wrap',
              mb: 2,
              pt: 1,
            }}
          >
            {/* SSL/Security Badge */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                backgroundColor: '#4caf50',
                color: 'white',
                px: 1.5,
                py: 0.8,
                borderRadius: 1,
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Lock sx={{ fontSize: '1rem' }} />
              <Typography variant="caption">SSL</Typography>
            </Box>

            {/* Eco/Safe Badge */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                backgroundColor: '#2e7d32',
                color: 'white',
                px: 1.5,
                py: 0.8,
                borderRadius: 1,
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Nature sx={{ fontSize: '1rem' }} />
              <Typography variant="caption">SAFE</Typography>
            </Box>

            {/* Payment Cards */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                px: 1.5,
                py: 0.8,
                borderRadius: 1,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <CreditCard sx={{ fontSize: '1.2rem', color: '#1a1f71' }} />
              <Typography
                variant="caption"
                sx={{ color: 'white', fontWeight: 600 }}
              >
                VISA
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                px: 1.5,
                py: 0.8,
                borderRadius: 1,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <CreditCard sx={{ fontSize: '1.2rem', color: '#eb001b' }} />
              <Typography
                variant="caption"
                sx={{ color: 'white', fontWeight: 600 }}
              >
                MASTERCARD
              </Typography>
            </Box>

            {/* 3DS Protection */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                backgroundColor: '#2196f3',
                color: 'white',
                px: 1.5,
                py: 0.8,
                borderRadius: 1,
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                fontWeight: 700,
                border: '2px solid #1976d2',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Security sx={{ fontSize: '1rem' }} />
              <Typography variant="caption">3DS2 PROTECTED</Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            textAlign="center"
            sx={{
              color: 'white',
              fontSize: { xs: '0.75rem', sm: '0.85rem' },
              fontWeight: 500,
              opacity: 0.95,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
            }}
          >
            {currentLang === 'bg'
              ? 'Сигурни плащания с Visa Secure & MasterCard Identity Check'
              : 'Secure payments with Visa Secure & MasterCard Identity Check'}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
