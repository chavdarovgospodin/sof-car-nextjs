'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material';
import {
  DirectionsCar,
  CheckCircle,
  Warning,
  Info,
  LocationOn,
  Flight,
} from '@mui/icons-material';

interface PricingPageProps {
  lang: Promise<string>;
}

export function PricingPage({ lang }: PricingPageProps) {
  const [currentLang, setCurrentLang] = React.useState('bg');

  React.useEffect(() => {
    lang.then(setCurrentLang);
  }, [lang]);

  const pricingData = [
    {
      class: currentLang === 'bg' ? 'Икономичен клас' : 'Economy Class',
      models:
        currentLang === 'bg'
          ? 'Opel Corsa, VW Polo, подобни'
          : 'Opel Corsa, VW Polo, similar',
      price: 30,
      deposit: 200,
      features: [
        currentLang === 'bg' ? 'Малки градски автомобили' : 'Small city cars',
        currentLang === 'bg' ? '4-5 пътника' : '4-5 passengers',
        currentLang === 'bg' ? '300-400л багаж' : '300-400L luggage',
        currentLang === 'bg' ? '5-7л/100км' : '5-7L/100km',
      ],
    },
    {
      class: currentLang === 'bg' ? 'Стандартен клас' : 'Standard Class',
      models:
        currentLang === 'bg'
          ? 'Skoda Octavia, VW Golf, подобни'
          : 'Skoda Octavia, VW Golf, similar',
      price: 50,
      deposit: 300,
      features: [
        currentLang === 'bg'
          ? 'Семейни седани и комби'
          : 'Family sedans and wagons',
        currentLang === 'bg' ? '5 пътника' : '5 passengers',
        currentLang === 'bg' ? '500-600л багаж' : '500-600L luggage',
        currentLang === 'bg' ? '6-8л/100км' : '6-8L/100km',
      ],
    },
    {
      class: currentLang === 'bg' ? 'Луксозен клас' : 'Premium Class',
      models:
        currentLang === 'bg'
          ? 'VW Arteon, Audi A4, подобни'
          : 'VW Arteon, Audi A4, similar',
      price: 80,
      deposit: 500,
      features: [
        currentLang === 'bg'
          ? 'Бизнес седани и SUV'
          : 'Business sedans and SUVs',
        currentLang === 'bg' ? '5-7 пътника' : '5-7 passengers',
        currentLang === 'bg' ? '600+л багаж' : '600+L luggage',
        currentLang === 'bg' ? '7-9л/100км' : '7-9L/100km',
      ],
    },
  ];

  const additionalFees = [
    {
      service: currentLang === 'bg' ? 'Офис Ямбол' : 'Yambol Office',
      fee: currentLang === 'bg' ? 'Без такса' : 'No fee',
      icon: <CheckCircle color="success" />,
    },
    {
      service:
        currentLang === 'bg'
          ? 'Друго място в Ямбол'
          : 'Other location in Yambol',
      fee: '50 BGN',
      icon: <LocationOn color="primary" />,
    },
    {
      service: currentLang === 'bg' ? 'Летище София' : 'Sofia Airport',
      fee: '100 BGN',
      icon: <Flight color="primary" />,
    },
    {
      service: currentLang === 'bg' ? 'Летище Бургас' : 'Burgas Airport',
      fee: '100 BGN',
      icon: <Flight color="primary" />,
    },
    {
      service: currentLang === 'bg' ? 'Летище Варна' : 'Varna Airport',
      fee: '100 BGN',
      icon: <Flight color="primary" />,
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'grey.50' }}>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
          color: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            textAlign="center"
            gutterBottom
            sx={{ mb: 3 }}
          >
            {currentLang === 'bg' ? 'Цени и тарифи' : 'Pricing & Rates'}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            textAlign="center"
            sx={{ opacity: 0.9 }}
          >
            {currentLang === 'bg'
              ? 'Пълна информация за цените, таксите и депозитите при наемане на автомобили'
              : 'Complete information about prices, fees and deposits for car rental'}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {/* Base Prices */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '1. Основни цени за наемане'
              : '1. Base Rental Prices'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Цените включват всички основни услуги и са валидни за минимален период от 5 дни:'
              : 'Prices include all basic services and are valid for a minimum period of 5 days:'}
          </Typography>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">
                      {currentLang === 'bg' ? 'Клас автомобил' : 'Car Class'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {currentLang === 'bg' ? 'Цена на ден' : 'Daily Rate'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {currentLang === 'bg' ? 'Депозит' : 'Deposit'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">
                      {currentLang === 'bg' ? 'Характеристики' : 'Features'}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pricingData.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: 'grey.50' },
                    }}
                  >
                    <TableCell>
                      <Box>
                        <Typography
                          variant="h6"
                          color="primary.main"
                          gutterBottom
                        >
                          {row.class}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {row.models}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h4"
                          color="primary.main"
                          component="span"
                        >
                          {row.price}
                        </Typography>
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{ ml: 1 }}
                        >
                          BGN
                        </Typography>
                        <Typography
                          variant="body2"
                          component="div"
                          color="text.secondary"
                        >
                          /{currentLang === 'bg' ? 'ден' : 'day'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" color="success.main">
                          {row.deposit} BGN
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {currentLang === 'bg' ? 'депозит' : 'deposit'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <List dense>
                        {row.features.map((feature, featureIndex) => (
                          <ListItem key={featureIndex} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircle
                                color="primary"
                                sx={{ fontSize: '1rem' }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Additional Fees */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '2. Допълнителни такси'
              : '2. Additional Fees'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Следните такси се прилагат в допълнение на основната цена:'
              : 'The following fees apply in addition to the base price:'}
          </Typography>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ mt: 3, mb: 2 }}
          >
            {currentLang === 'bg'
              ? '2.1 Такси за вземане/връщане'
              : '2.1 Pickup/Delivery Fees'}
          </Typography>

          <Grid container spacing={2}>
            {additionalFees.map((fee, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ mb: 1 }}>{fee.icon}</Box>
                  <Typography variant="h6" gutterBottom>
                    {fee.service}
                  </Typography>
                  <Chip
                    label={fee.fee}
                    color={
                      fee.fee ===
                      (currentLang === 'bg' ? 'Без такса' : 'No fee')
                        ? 'success'
                        : 'primary'
                    }
                    variant="outlined"
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* What's Included */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '3. Какво е включено в цената'
              : "3. What's Included in the Price"}
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <strong>
                        {currentLang === 'bg'
                          ? 'Пълно застраховане'
                          : 'Full Insurance'}
                      </strong>
                    }
                    secondary={
                      currentLang === 'bg'
                        ? 'Автокаско и гражданска отговорност'
                        : 'Collision and liability insurance'
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <strong>
                        {currentLang === 'bg'
                          ? '24/7 Поддръжка'
                          : '24/7 Support'}
                      </strong>
                    }
                    secondary={
                      currentLang === 'bg'
                        ? 'Денонощна помощ на пътя'
                        : '24/7 roadside assistance'
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <strong>
                        {currentLang === 'bg'
                          ? 'Без лимит километри'
                          : 'Unlimited Mileage'}
                      </strong>
                    }
                    secondary={
                      currentLang === 'bg'
                        ? 'Шофирайте колкото искате'
                        : 'Drive as much as you want'
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <strong>
                        {currentLang === 'bg'
                          ? 'Техническа поддръжка'
                          : 'Technical Support'}
                      </strong>
                    }
                    secondary={
                      currentLang === 'bg'
                        ? 'При проблем с автомобила'
                        : "If there's a problem with the car"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <strong>
                        {currentLang === 'bg'
                          ? 'Резервен автомобил'
                          : 'Replacement Car'}
                      </strong>
                    }
                    secondary={
                      currentLang === 'bg' ? 'При необходимост' : 'When needed'
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <strong>
                        {currentLang === 'bg'
                          ? 'Детайлна документация'
                          : 'Detailed Documentation'}
                      </strong>
                    }
                    secondary={
                      currentLang === 'bg'
                        ? 'Договор и фактура'
                        : 'Contract and invoice'
                    }
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>

        {/* Important Notes */}
        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg' ? '4. Важни забележки' : '4. Important Notes'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Минимален период:'
                      : 'Minimum period:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? '5 дни за всички класове автомобили'
                    : '5 days for all car classes'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Warning color="warning" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Депозит:' : 'Deposit:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Възстановява се при връщане на автомобила в добро състояние'
                    : 'Refunded when the car is returned in good condition'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Резервация:' : 'Reservation:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Препоръчително е да резервирате поне 24 часа предварително'
                    : 'It is recommended to book at least 24 hours in advance'
                }
              />
            </ListItem>
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
