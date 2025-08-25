'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  useTheme,
  useMediaQuery,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  MenuItem,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
// Using standard Grid without item prop for MUI v7
import {
  DirectionsCar,
  Security,
  Speed,
  Support,
  CheckCircle,
  Phone,
  Email,
  LocationOn,
  Business,
  Calculate,
  Send,
  Lock,
  Nature,
  CreditCard,
  LocalGasStation,
} from '@mui/icons-material';
import { Chip } from '@mui/material';
import { useTranslations } from '@/hooks/useTranslations';
import { CAR_CLASSES, APP_CONFIG } from '@/utils/constants';
import Link from 'next/link';
import Image from 'next/image';

export function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t, currentLang } = useTranslations();

  // Изчистваме localStorage при зареждане на главната страница
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('quickBookingDates');
    }
  }, []);

  // Quick booking state
  const [quickBookingDates, setQuickBookingDates] = useState({
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: '09:00',
    returnDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    returnTime: '17:00',
  });

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  // Handle form input changes
  const handleInputChange =
    (field: string) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      setSnackbar({
        open: true,
        message:
          currentLang === 'bg'
            ? 'Моля попълнете всички полета'
            : 'Please fill in all fields',
        severity: 'error',
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbar({
        open: true,
        message:
          currentLang === 'bg'
            ? 'Моля въведете валиден имейл адрес'
            : 'Please enter a valid email address',
        severity: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await window.emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      if (result.status === 200) {
        setSnackbar({
          open: true,
          message:
            currentLang === 'bg'
              ? 'Съобщението беше изпратено успешно! Ще се свържем с вас скоро.'
              : 'Message sent successfully! We will contact you soon.',
          severity: 'success',
        });

        // Clear form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSnackbar({
        open: true,
        message:
          currentLang === 'bg'
            ? 'Възникна грешка при изпращането. Моля опитайте отново.'
            : 'An error occurred while sending. Please try again.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box>
      {/* Hero Section with Quick Booking Popup */}
      <Box
        id="body"
        sx={{
          backgroundImage: 'url(/slider-image-1-1920x700.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left Side - Quick Booking Popup */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'text.primary',
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 4, textAlign: 'center' }}
                >
                  {currentLang === 'bg'
                    ? 'Изберете дати и час за вашата резервация'
                    : 'Select dates and time for your reservation'}
                </Typography>

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      type="date"
                      label={
                        currentLang === 'bg' ? 'Дата вземане' : 'Pickup Date'
                      }
                      value={quickBookingDates.pickupDate}
                      onChange={(e) =>
                        setQuickBookingDates((prev) => ({
                          ...prev,
                          pickupDate: e.target.value,
                        }))
                      }
                      InputLabelProps={{ shrink: true }}
                      inputProps={{
                        min: new Date().toISOString().split('T')[0],
                      }}
                      required
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: 1.5,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      type="time"
                      label={
                        currentLang === 'bg' ? 'Час вземане' : 'Pickup Time'
                      }
                      value={quickBookingDates.pickupTime}
                      onChange={(e) =>
                        setQuickBookingDates((prev) => ({
                          ...prev,
                          pickupTime: e.target.value,
                        }))
                      }
                      InputLabelProps={{ shrink: true }}
                      required
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: 1.5,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      type="date"
                      label={
                        currentLang === 'bg' ? 'Дата връщане' : 'Return Date'
                      }
                      value={quickBookingDates.returnDate}
                      onChange={(e) =>
                        setQuickBookingDates((prev) => ({
                          ...prev,
                          returnDate: e.target.value,
                        }))
                      }
                      InputLabelProps={{ shrink: true }}
                      required
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: 1.5,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      type="time"
                      label={
                        currentLang === 'bg' ? 'Час връщане' : 'Return Time'
                      }
                      value={quickBookingDates.returnTime}
                      onChange={(e) =>
                        setQuickBookingDates((prev) => ({
                          ...prev,
                          returnTime: e.target.value,
                        }))
                      }
                      InputLabelProps={{ shrink: true }}
                      required
                      size="small"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          borderRadius: 1.5,
                        },
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      onClick={() => {
                        // Запазваме датите в localStorage
                        localStorage.setItem(
                          'quickBookingDates',
                          JSON.stringify(quickBookingDates)
                        );
                        // Навигираме към букинг страницата
                        window.location.href = `/${currentLang}/booking`;
                      }}
                      variant="contained"
                      fullWidth
                      size="large"
                      sx={{
                        height: 48,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {currentLang === 'bg'
                        ? 'Търси автомобили'
                        : 'Search cars'}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Right Side - Hero Content */}
            <Grid size={{ xs: 12, md: 7 }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    mb: 3,
                  }}
                >
                  {currentLang === 'bg'
                    ? 'Коли под наем Соф Кар'
                    : 'Sof Car Rental'}
                </Typography>

                <Typography
                  variant="h4"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontWeight: 'normal',
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    mb: 4,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                  }}
                >
                  {currentLang === 'bg' ? 'град Ямбол' : 'Yambol City'}
                </Typography>

                <Typography
                  variant="h6"
                  component="p"
                  sx={{
                    maxWidth: '600px',
                    mb: 4,
                    opacity: 0.95,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    lineHeight: 1.6,
                  }}
                >
                  {currentLang === 'bg'
                    ? 'Изгодни и надеждни автомобили под наем за град Ямбол и цялата страна.'
                    : 'Affordable and reliable car rental service in Yambol and throughout the country.'}
                </Typography>

                {/* Additional Features */}
                <Box
                  sx={{
                    display: 'flex',
                    gap: 3,
                    flexWrap: 'wrap',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ color: '#4CAF50', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {currentLang === 'bg' ? '24/7 Поддръжка' : '24/7 Support'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Security sx={{ color: '#FF9800', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {currentLang === 'bg'
                        ? 'Застраховани коли'
                        : 'Insured Cars'}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DirectionsCar sx={{ color: '#2196F3', fontSize: 20 }} />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {currentLang === 'bg'
                        ? 'Отлични условия за наемане'
                        : 'Excellent rental conditions'}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box id="about" sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }} sx={{ mb: 2 }}>
              <Image
                src="/about.webp"
                alt="About SofCar"
                width={600}
                height={400}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h4"
                component="h2"
                textAlign="center"
                gutterBottom
                sx={{
                  mb: 2,
                  textAlign: 'left',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}
              >
                {currentLang === 'bg' ? 'За нас' : 'About Us'}
              </Typography>
              <Typography variant="body1" paragraph>
                {currentLang === 'bg'
                  ? 'Разполагаме с голям асортимент от автомобили, разпределени по класове, като всички автомобили под наем са поддържани в перфектно техническо състояние, което гарантира Вашето сигурно и надеждно пътуване. Независимо дали се нуждаете от икономичен, стандартен или луксозен автомобил, ние можем да Ви предложим оферта която е изцяло съобразена с Вашите възможности, необходимости и предпочитания.'
                  : 'We have a large selection of cars distributed by class, with all rental cars maintained in perfect technical condition, which guarantees your safe and reliable travel. Whether you need an economy, standard or luxury car, we can offer you a deal that is entirely tailored to your capabilities, needs and preferences.'}
              </Typography>
            </Grid>
          </Grid>

          {/* Info Boxes */}
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <CreditCard sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {currentLang === 'bg'
                    ? 'Цени и период за наемане'
                    : 'Prices and Rental Period'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentLang === 'bg'
                    ? 'Цени започващи от 30 лева на ден с минимален наемен период 5 дни и не по-малко от 5 години шофьорски стаж'
                    : 'Prices starting from 30 BGN per day with a minimum rental period of 5 days and at least 5 years of driving experience'}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Security sx={{ fontSize: 40, color: 'primary.main' }} />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {currentLang === 'bg'
                    ? 'Гаранционен депозит'
                    : 'Security Deposit'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentLang === 'bg'
                    ? 'При наемането на автомобила, Наемателят е длъжен да остави депозит. Стойността на депозита зависи от избрания клас на автомобил и е в диапазона от 200 до 500 лева.'
                    : 'When renting a car, the Renter is required to leave a deposit. The deposit amount depends on the selected car class and ranges from 200 to 500 BGN.'}
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  height: '100%',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <LocalGasStation
                    sx={{ fontSize: 40, color: 'primary.main' }}
                  />
                </Box>
                <Typography variant="h6" gutterBottom>
                  {currentLang === 'bg' ? 'Гориво' : 'Fuel'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentLang === 'bg'
                    ? 'Автомобилът се предоставя с пълен резервоар и по условия на договора трябва да бъде върнат с пълен резервоар.'
                    : 'The car is provided with a full tank and according to the contract terms it must be returned with a full tank.'}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Why Choose Us */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              gutterBottom
              sx={{ mb: 4 }}
            >
              {currentLang === 'bg'
                ? 'Защо да изберете нашите коли под наем'
                : 'Why choose our car rental service'}
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <List>
                  {currentLang === 'bg' ? (
                    <>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary="Перфектно окомплектовани автомобили, съобразно изискванията на КАТ" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary="Коли под наем в отлично техническо състояние" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary="Атрактивна цена, без лимит на изминатите километри" />
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary="Perfectly equipped cars according to KAT requirements" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary="Rental cars in excellent technical condition" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary="Attractive price, no mileage limit" />
                      </ListItem>
                    </>
                  )}
                </List>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <List>
                  {currentLang === 'bg' ? (
                    <>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary="Без скрити такси" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary="Включени в цената: пълно автокаско, гражданска отговорност, денонощна пътна помощ, техническа поддръжка, платена пътна такса" />
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary="No hidden fees" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: 'success.main' }} />
                        </ListItemIcon>
                        <ListItemText primary="Included in the price: full comprehensive insurance, civil liability, 24/7 roadside assistance, technical support, paid road tax" />
                      </ListItem>
                    </>
                  )}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Our Cars Section - Current Work */}
      <Box
        id="offers"
        sx={{ py: { xs: 6, md: 8 }, backgroundColor: '#f8f9fa' }}
      >
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

          {/* Tiles Section with Car Images - Exactly like old site */}
          <Box sx={{ mb: 2 }}>
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
                      transition:
                        'background-color 0.5s ease, opacity 0.5s ease',
                    },
                    '&:hover .description': {
                      maxHeight: '12em',
                      opacity: 1,
                      transition: 'max-height 0.5s ease, opacity 0.5s ease',
                    },
                  }}
                >
                  <Box
                    className="image-container"
                    sx={{ position: 'relative' }}
                  >
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
                        transition:
                          'background-color 0.5s ease, opacity 0.5s ease',
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
                      transition:
                        'background-color 0.5s ease, opacity 0.5s ease',
                    },
                    '&:hover .description': {
                      maxHeight: '12em',
                      opacity: 1,
                      transition: 'max-height 0.5s ease, opacity 0.5s ease',
                    },
                  }}
                >
                  <Box
                    className="image-container"
                    sx={{ position: 'relative' }}
                  >
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
                        transition:
                          'background-color 0.8s ease, opacity 0.8s ease',
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
                      transition:
                        'background-color 0.5s ease, opacity 0.5s ease',
                    },
                    '&:hover .description': {
                      maxHeight: '12em',
                      opacity: 1,
                      transition: 'max-height 0.5s ease, opacity 0.5s ease',
                    },
                  }}
                >
                  <Box
                    className="image-container"
                    sx={{ position: 'relative' }}
                  >
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
                        transition:
                          'background-color 0.8s ease, opacity 0.8s ease',
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
                          ? 'Луксозен клас'
                          : 'Premium Class'}
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
          </Box>
        </Container>
      </Box>

      {/* Reservation Section */}

      {/* Contact Section with Map and Form */}
      <Box sx={{ py: { xs: 6, md: 8 }, backgroundColor: 'grey.50' }}>
        {/* Call to Action Header */}
        <Box
          sx={{
            py: { xs: 6, md: 4 },
            color: 'primary.light',
          }}
        >
          <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h2" gutterBottom>
              {currentLang === 'bg'
                ? 'Обадете ни се за наличности и цени или направете запитване в нашата контактна форма по-долу'
                : 'Call us for availability and prices or make an inquiry in our contact form below'}
            </Typography>
          </Container>
        </Box>

        <Container maxWidth="lg">
          {/* Google Maps - Above Contact Form */}
          <Box sx={{ mb: 6 }}>
            <Box
              sx={{
                width: '100%',
                height: 450,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              }}
            >
              <iframe
                title="SofCar Location in Yambol"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26114.18985576526!2d26.506186044907285!3d42.49307908419431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a63435db7821ef%3A0x789eff0b31da8b94!2sauto%20service%20AVTOTSENTAR!5e0!3m2!1sen!2sbg!4v1689711472346!5m2!1sen!2sbg"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Box>

          {/* Contact Form and Information */}
          <Typography
            variant="h4"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            {currentLang === 'bg' ? 'Контакти' : 'Contact'}
          </Typography>

          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ mb: 3 }}
              >
                {currentLang === 'bg'
                  ? 'Направете запитване'
                  : 'Make an Inquiry'}
              </Typography>

              <Paper
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  p: 3,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={currentLang === 'bg' ? 'Име' : 'Name'}
                      value={formData.name}
                      onChange={handleInputChange('name')}
                      required
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      required
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      type="tel"
                      label={currentLang === 'bg' ? 'Телефон' : 'Phone'}
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      required
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      label={currentLang === 'bg' ? 'Съобщение' : 'Message'}
                      value={formData.message}
                      onChange={handleInputChange('message')}
                      required
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={
                        isSubmitting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <Send />
                        )
                      }
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? currentLang === 'bg'
                          ? 'Изпраща се...'
                          : 'Sending...'
                        : currentLang === 'bg'
                        ? 'Изпрати съобщение'
                        : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Contact Information */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ mb: 3 }}
              >
                {currentLang === 'bg'
                  ? 'Информация за контакт'
                  : 'Contact Information'}
              </Typography>

              <Paper
                sx={{
                  p: 3,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
                >
                  <Phone sx={{ color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {currentLang === 'bg' ? 'Телефон' : 'Phone'}
                    </Typography>
                    <Typography variant="body1">
                      <Link href="tel:+359879994212" color="inherit">
                        +359 87 999 4212
                      </Link>
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
                >
                  <Email sx={{ color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      <Link href="mailto:2013anikar@gmail.com" color="inherit">
                        2013anikar@gmail.com
                      </Link>
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
                >
                  <LocationOn sx={{ color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {currentLang === 'bg' ? 'Адрес' : 'Address'}
                    </Typography>
                    <Typography variant="body1">
                      Западна промишлена зона, Ямбол, 8600
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
                >
                  <Business sx={{ color: 'primary.main' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      {currentLang === 'bg'
                        ? 'Работно време'
                        : 'Business Hours'}
                    </Typography>
                    <Typography variant="body1">
                      {currentLang === 'bg'
                        ? 'Понеделник - Петък: 8:00 - 18:00'
                        : 'Monday - Friday: 8:00 AM - 6:00 PM'}
                    </Typography>
                    <Typography variant="body1">
                      {currentLang === 'bg'
                        ? 'Събота: 9:00 - 16:00'
                        : 'Saturday: 9:00 AM - 4:00 PM'}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
