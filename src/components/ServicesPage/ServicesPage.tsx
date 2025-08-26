'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  DirectionsCar,
  Business,
  CheckCircle,
  Speed,
  Security,
  Support,
} from '@mui/icons-material';
import React from 'react';

interface ServicesPageProps {
  lang: Promise<string>;
}

export function ServicesPage({ lang }: ServicesPageProps) {
  const [currentLang, setCurrentLang] = React.useState('bg');

  React.useEffect(() => {
    lang.then(setCurrentLang);
  }, [lang]);

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
            {currentLang === 'bg'
              ? 'Услуги и автомобили'
              : 'Our Services & Cars'}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            textAlign="center"
            sx={{ opacity: 0.9 }}
          >
            {currentLang === 'bg'
              ? 'Детайлно описание на нашите услуги за коли под наем в Ямбол'
              : 'Detailed description of our car rental services in Yambol'}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {/* Last Updated */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            <strong>
              {currentLang === 'bg'
                ? 'Последна актуализация:'
                : 'Last updated:'}
            </strong>{' '}
            {currentLang === 'bg' ? '19 август 2025 г.' : 'August 19, 2025'}
          </Typography>
        </Box>

        {/* Main Services */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg' ? '1. Основни услуги' : '1. Main Services'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Соф Кар Rental предлага пълна гама от услуги за коли под наем, насочени към задоволяване на всички нужди на нашите клиенти:'
              : "Sof Car Rental offers a complete range of car rental services designed to meet all our customers' needs:"}
          </Typography>

          <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
            {currentLang === 'bg'
              ? '1.1 Наемане на автомобили'
              : '1.1 Car Rental'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Краткосрочно наемане:'
                      : 'Short-term rental:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'От 5 дни до 1 месец'
                    : 'From 5 days to 1 month'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Дългосрочно наемане:'
                      : 'Long-term rental:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'От 1 месец до 1 година'
                    : 'From 1 month to 1 year'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Бизнес наемане:'
                      : 'Business rental:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Специални условия за компании'
                    : 'Special conditions for companies'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Туристическо наемане:'
                      : 'Tourist rental:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'За гости в града'
                    : 'For city visitors'
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Car Classes */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg' ? '2. Класове автомобили' : '2. Car Classes'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Нашият автопарк включва автомобили от три основни класа, всеки с уникални характеристики:'
              : 'Our fleet includes cars from three main classes, each with unique characteristics:'}
          </Typography>

          {/* Economy Class */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{ color: 'primary.main' }}
            >
              {currentLang === 'bg'
                ? '2.1 Икономичен клас'
                : '2.1 Economy Class'}
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>
                  {currentLang === 'bg' ? 'Характеристики:' : 'Features:'}
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <strong>
                          {currentLang === 'bg' ? 'Тип:' : 'Type:'}
                        </strong>
                      }
                      secondary={
                        currentLang === 'bg'
                          ? 'Малки градски автомобили'
                          : 'Small city cars'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <strong>
                          {currentLang === 'bg' ? 'Вместимост:' : 'Capacity:'}
                        </strong>
                      }
                      secondary={
                        currentLang === 'bg' ? '4-5 пътника' : '4-5 passengers'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <strong>
                          {currentLang === 'bg' ? 'Багаж:' : 'Luggage:'}
                        </strong>
                      }
                      secondary={
                        currentLang === 'bg'
                          ? '300-400 литра'
                          : '300-400 liters'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <strong>
                          {currentLang === 'bg'
                            ? 'Разход:'
                            : 'Fuel consumption:'}
                        </strong>
                      }
                      secondary={
                        currentLang === 'bg' ? '5-7 л/100 км' : '5-7 L/100 km'
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>
                  {currentLang === 'bg' ? 'Модели:' : 'Models:'}
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Opel Corsa"
                      secondary={
                        currentLang === 'bg'
                          ? 'Компактен и практичен'
                          : 'Compact and practical'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Volkswagen Polo"
                      secondary={
                        currentLang === 'bg'
                          ? 'Надежден и икономичен'
                          : 'Reliable and economical'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Skoda Fabia"
                      secondary={
                        currentLang === 'bg'
                          ? 'Просторен за класа си'
                          : 'Spacious for its class'
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Standard Class */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{ color: 'primary.main' }}
            >
              {currentLang === 'bg'
                ? '2.2 Стандартен клас'
                : '2.2 Standard Class'}
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>
                  {currentLang === 'bg' ? 'Характеристики:' : 'Features:'}
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <strong>
                          {currentLang === 'bg' ? 'Тип:' : 'Type:'}
                        </strong>
                      }
                      secondary={
                        currentLang === 'bg'
                          ? 'Семейни седани и комби'
                          : 'Family sedans and wagons'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <strong>
                          {currentLang === 'bg' ? 'Вместимост:' : 'Capacity:'}
                        </strong>
                      }
                      secondary={
                        currentLang === 'bg' ? '5 пътника' : '5 passengers'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <strong>
                          {currentLang === 'bg' ? 'Багаж:' : 'Luggage:'}
                        </strong>
                      }
                      secondary={
                        currentLang === 'bg'
                          ? '500-600 литра'
                          : '500-600 liters'
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>
                  {currentLang === 'bg' ? 'Модели:' : 'Models:'}
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Skoda Octavia"
                      secondary={
                        currentLang === 'bg'
                          ? 'Просторен и удобен'
                          : 'Spacious and comfortable'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Volkswagen Passat"
                      secondary={
                        currentLang === 'bg'
                          ? 'Елегантен и надежден'
                          : 'Elegant and reliable'
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Premium Class */}
          <Box>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{ color: 'primary.main' }}
            >
              {currentLang === 'bg' ? '2.3 Луксозен клас' : '2.3 Premium Class'}
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>
                  {currentLang === 'bg' ? 'Характеристики:' : 'Features:'}
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <strong>
                          {currentLang === 'bg' ? 'Тип:' : 'Type:'}
                        </strong>
                      }
                      secondary={
                        currentLang === 'bg'
                          ? 'Бизнес седани и SUV'
                          : 'Business sedans and SUVs'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <strong>
                          {currentLang === 'bg' ? 'Вместимост:' : 'Capacity:'}
                        </strong>
                      }
                      secondary={
                        currentLang === 'bg' ? '5-7 пътника' : '5-7 passengers'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <strong>
                          {currentLang === 'bg' ? 'Багаж:' : 'Luggage:'}
                        </strong>
                      }
                      secondary={
                        currentLang === 'bg' ? '600+ литра' : '600+ liters'
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>
                  {currentLang === 'bg' ? 'Модели:' : 'Models:'}
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Volkswagen Arteon"
                      secondary={
                        currentLang === 'bg'
                          ? 'Стилен и луксозен'
                          : 'Stylish and luxurious'
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <DirectionsCar color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Audi A4"
                      secondary={
                        currentLang === 'bg'
                          ? 'Премиум качество'
                          : 'Premium quality'
                      }
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {/* Additional Services */}
        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '3. Допълнителни услуги'
              : '3. Additional Services'}
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
              >
                <Security color="primary" />
                <Typography variant="h6">
                  {currentLang === 'bg'
                    ? 'Пълно застраховане'
                    : 'Full Insurance'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {currentLang === 'bg'
                  ? 'Всички автомобили са застраховани с пълно покритие, включително автокаско и гражданска отговорност.'
                  : 'All cars are fully insured with comprehensive coverage including collision and liability insurance.'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
              >
                <Support color="primary" />
                <Typography variant="h6">
                  {currentLang === 'bg' ? '24/7 Поддръжка' : '24/7 Support'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {currentLang === 'bg'
                  ? 'Денонощна помощ на пътя и техническа поддръжка за всички клиенти.'
                  : '24/7 roadside assistance and technical support for all customers.'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
              >
                <Speed color="primary" />
                <Typography variant="h6">
                  {currentLang === 'bg'
                    ? 'Без лимит километри'
                    : 'Unlimited Mileage'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {currentLang === 'bg'
                  ? 'Без ограничения в километрите - шофирайте колкото искате без допълнителни такси.'
                  : 'No mileage restrictions - drive as much as you want without additional fees.'}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
              >
                <Business color="primary" />
                <Typography variant="h6">
                  {currentLang === 'bg'
                    ? 'Бизнес решения'
                    : 'Business Solutions'}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {currentLang === 'bg'
                  ? 'Специални условия за компании с дългосрочни договори и корпоративни отстъпки.'
                  : 'Special conditions for companies with long-term contracts and corporate discounts.'}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
