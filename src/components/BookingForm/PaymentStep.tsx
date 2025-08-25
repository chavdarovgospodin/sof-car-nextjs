'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  Alert,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  CheckCircle,
  CreditCard,
  Payment,
  Receipt,
  Security,
} from '@mui/icons-material';
import { useTranslations } from '@/hooks/useTranslations';
import { BookingData } from '@/utils/validation';
import { CAR_CLASSES } from '@/utils/constants';
import { getDaysDifference } from '@/utils/dateUtils';

interface PaymentStepProps {
  data?: Partial<BookingData>;
  onSubmit: (data: Partial<BookingData>) => void;
  onBack: () => void;
}

export function PaymentStep({ data, onSubmit, onBack }: PaymentStepProps) {
  const { t, currentLang } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      onSubmit(data || {});
    } catch (error) {
      console.error('Payment error:', error);
      alert('Грешка при плащането. Моля, опитайте отново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate booking summary
  const startDate = data?.startDate;
  const endDate = data?.endDate;
  const carClass = data?.carClass;

  const days = startDate && endDate ? getDaysDifference(startDate, endDate) : 0;
  const dailyPrice = carClass
    ? parseFloat(
        CAR_CLASSES[carClass as keyof typeof CAR_CLASSES].price[
          currentLang as 'bg' | 'en'
        ]
      )
    : 0;
  const totalPrice = days * dailyPrice;

  const isDataComplete =
    startDate &&
    endDate &&
    carClass &&
    data.customerName &&
    data.email &&
    data.phone;

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        {currentLang === 'bg'
          ? 'Плащане и потвърждение'
          : 'Payment & Confirmation'}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {currentLang === 'bg'
          ? 'Прегледайте детайлите на резервацията и потвърдете плащането'
          : 'Review your booking details and confirm payment'}
      </Typography>

      {/* Booking Summary */}
      <Paper sx={{ p: 3, mb: 4, backgroundColor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          {currentLang === 'bg'
            ? 'Обобщение на резервацията:'
            : 'Booking Summary:'}
        </Typography>

        <Grid container spacing={3}>
          {/* Customer Info */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle1" gutterBottom>
              {currentLang === 'bg'
                ? 'Информация за клиент:'
                : 'Customer Information:'}
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={currentLang === 'bg' ? 'Име' : 'Name'}
                  secondary={data?.customerName}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={data?.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={currentLang === 'bg' ? 'Телефон' : 'Phone'}
                  secondary={data?.phone}
                />
              </ListItem>
            </List>
          </Grid>

          {/* Rental Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="subtitle1" gutterBottom>
              {currentLang === 'bg' ? 'Детайли за наема:' : 'Rental Details:'}
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={currentLang === 'bg' ? 'Автомобил' : 'Car'}
                  secondary={
                    carClass
                      ? CAR_CLASSES[carClass as keyof typeof CAR_CLASSES]
                          .displayName[currentLang as 'bg' | 'en']
                      : ''
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={currentLang === 'bg' ? 'Период' : 'Period'}
                  secondary={`${startDate} - ${endDate}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    currentLang === 'bg' ? 'Продължителност' : 'Duration'
                  }
                  secondary={`${days} ${currentLang === 'bg' ? 'дни' : 'days'}`}
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Price Breakdown */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">
            {currentLang === 'bg' ? 'Обща цена:' : 'Total Price:'}
          </Typography>
          <Typography
            variant="h4"
            color="primary.main"
            sx={{ fontWeight: 'bold' }}
          >
            {totalPrice.toFixed(2)}{' '}
            {carClass
              ? CAR_CLASSES[carClass as keyof typeof CAR_CLASSES].currency
              : 'BGN'}
          </Typography>
        </Box>
      </Paper>

      {/* Payment Methods */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {currentLang === 'bg' ? 'Методи за плащане:' : 'Payment Methods:'}
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper
              sx={{
                p: 2,
                border: 1,
                borderColor: 'primary.main',
                backgroundColor: 'primary.light',
                cursor: 'pointer',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CreditCard color="primary" />
                <Typography variant="subtitle1">
                  {currentLang === 'bg' ? 'Кредитна карта' : 'Credit Card'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {currentLang === 'bg'
                  ? 'Visa, MasterCard, American Express'
                  : 'Visa, MasterCard, American Express'}
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper
              sx={{
                p: 2,
                border: 1,
                borderColor: 'divider',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'primary.light',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Payment color="action" />
                <Typography variant="subtitle1">
                  {currentLang === 'bg' ? 'Наложен платеж' : 'Cash on Delivery'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {currentLang === 'bg'
                  ? 'Плащане при получаване'
                  : 'Pay when you receive the car'}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Security Info */}
      <Alert severity="info" sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Security />
          <Typography>
            {currentLang === 'bg'
              ? 'Вашите данни са защитени с SSL криптиране. Ние не съхраняваме информация за кредитните карти.'
              : 'Your data is protected with SSL encryption. We do not store credit card information.'}
          </Typography>
        </Box>
      </Alert>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={onBack}
          size="large"
          sx={{ minWidth: 120 }}
        >
          {currentLang === 'bg' ? 'Назад' : 'Back'}
        </Button>

        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={!isDataComplete || isSubmitting}
          startIcon={isSubmitting ? null : <Receipt />}
          sx={{ minWidth: 120 }}
        >
          {isSubmitting
            ? currentLang === 'bg'
              ? 'Обработване...'
              : 'Processing...'
            : currentLang === 'bg'
            ? 'Потвърди резервацията'
            : 'Confirm Booking'}
        </Button>
      </Box>

      {/* Final Info */}
      <Alert severity="success" sx={{ mt: 4 }}>
        <Typography variant="body2">
          {currentLang === 'bg'
            ? 'След потвърждението ще получите имейл с детайлите на резервацията. Нашият екип ще се свърже с вас за потвърждение.'
            : 'After confirmation, you will receive an email with booking details. Our team will contact you for confirmation.'}
        </Typography>
      </Alert>
    </Box>
  );
}
