'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle,
  Info,
  Warning,
  Cancel,
  LocalShipping,
  Security,
  Payment,
} from '@mui/icons-material';

interface TermsConditionsPageProps {
  lang: Promise<string>;
}

export function TermsConditionsPage({ lang }: TermsConditionsPageProps) {
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
              ? 'Общи условия и политики'
              : 'Terms & Conditions'}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            textAlign="center"
            sx={{ opacity: 0.9 }}
          >
            {currentLang === 'bg'
              ? 'Пълна информация за вашите права и задължения при наемане на автомобили'
              : 'Complete information about your rights and obligations when renting cars'}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        {/* General Terms */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '1. Общи условия за наемане'
              : '1. General Rental Terms'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Наемането на автомобили от Соф Кар Rental се регулира от следните общи условия:'
              : 'Car rental from Sof Car Rental is governed by the following general terms:'}
          </Typography>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ mt: 3, mb: 2 }}
          >
            {currentLang === 'bg'
              ? '1.1 Условия за наемане'
              : '1.1 Rental Conditions'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Наемането е възможно за лица на възраст 21+ години'
                    : 'Rental is available for persons aged 21+ years'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Необходимо е валидно шофьорско удостоверение с минимален стаж 2 години'
                    : "Valid driver's license with minimum 2 years experience required"
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Изисква се валидна лична карта или паспорт'
                    : 'Valid ID card or passport required'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Минималният период за наем е 5 дни'
                    : 'Minimum rental period is 5 days'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Максималният период за наем е 30 дни'
                    : 'Maximum rental period is 30 days'
                }
              />
            </ListItem>
          </List>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ mt: 3, mb: 2 }}
          >
            {currentLang === 'bg'
              ? '1.2 Документи за наемане'
              : '1.2 Rental Documents'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Валидно шофьорско удостоверение'
                    : "Valid driver's license"
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Лична карта или паспорт'
                    : 'ID card or passport'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Договор за наем (подписан при вземане)'
                    : 'Rental contract (signed upon pickup)'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Депозит в размер на 200 лева'
                    : 'Deposit of 200 BGN'
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Cancellation Policy */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '2. Политика за отказ'
              : '2. Cancellation Policy'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Политиката за отказ на резервация се прилага както следва:'
              : 'The reservation cancellation policy applies as follows:'}
          </Typography>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ mt: 3, mb: 2 }}
          >
            {currentLang === 'bg'
              ? '2.1 Отказ преди 24 часа'
              : '2.1 Cancellation before 24 hours'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Пълно възстановяване на сумата'
                    : 'Full refund of the amount'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Без допълнителни такси'
                    : 'No additional fees'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Възстановяване в рамките на 5 работни дни'
                    : 'Refund within 5 business days'
                }
              />
            </ListItem>
          </List>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ mt: 3, mb: 2 }}
          >
            {currentLang === 'bg'
              ? '2.2 Отказ в рамките на 24 часа'
              : '2.2 Cancellation within 24 hours'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Warning color="warning" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Удържане на 50% от сумата'
                    : '50% of the amount is withheld'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Възстановяване на 50% в рамките на 5 работни дни'
                    : '50% refund within 5 business days'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Приложимо за резервации за следващия ден'
                    : 'Applicable for reservations for the next day'
                }
              />
            </ListItem>
          </List>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ mt: 3, mb: 2 }}
          >
            {currentLang === 'bg'
              ? '2.3 Отказ в деня на резервация'
              : '2.3 Cancellation on the day of reservation'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Cancel color="error" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Удържане на 100% от сумата'
                    : '100% of the amount is withheld'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Cancel color="error" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg' ? 'Без възстановяване' : 'No refund'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Приложимо за резервации за същия ден'
                    : 'Applicable for reservations for the same day'
                }
              />
            </ListItem>
          </List>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ mt: 3, mb: 2 }}
          >
            {currentLang === 'bg'
              ? '2.4 Форсмажорни обстоятелства'
              : '2.4 Force Majeure'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'При природни бедствия, пандемии, войни'
                    : 'In case of natural disasters, pandemics, wars'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircle color="success" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Пълно възстановяване на сумата'
                    : 'Full refund of the amount'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Info color="info" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Необходимо е документално потвърждение'
                    : 'Documentary confirmation required'
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Delivery Policy */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '3. Политика за доставка'
              : '3. Delivery Policy'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Политиката за доставка на автомобили включва:'
              : 'The car delivery policy includes:'}
          </Typography>

          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ mt: 3, mb: 2 }}
          >
            {currentLang === 'bg'
              ? '3.1 Вземане на автомобила'
              : '3.1 Car Pickup'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalShipping color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Вземане от офиса в Ямбол - без допълнителна такса'
                    : 'Pickup from Yambol office - no additional fee'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalShipping color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Доставка на друго място в Ямбол - 50 лева'
                    : 'Delivery to other location in Yambol - 50 BGN'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocalShipping color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  currentLang === 'bg'
                    ? 'Доставка на летище - 100 лева'
                    : 'Airport delivery - 100 BGN'
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Insurance and Liability */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '4. Застраховане и отговорност'
              : '4. Insurance and Liability'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'Всички автомобили са застраховани с пълно покритие:'
              : 'All cars are fully insured with comprehensive coverage:'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Security color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Автокаско:'
                      : 'Collision insurance:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Покрива щетите при пътнотранспортно произшествие'
                    : 'Covers damages in case of traffic accident'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Security color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Гражданска отговорност:'
                      : 'Liability insurance:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Покрива щетите на трети лица'
                    : 'Covers damages to third parties'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Security color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Денонощна помощ:'
                      : '24/7 assistance:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'Помощ на пътя при проблеми'
                    : 'Roadside assistance in case of problems'
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Payment Terms */}
        <Paper sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg'
              ? '5. Условия за плащане'
              : '5. Payment Terms'}
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <Payment color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Депозит:' : 'Deposit:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? '200-500 лева в зависимост от класа автомобил'
                    : '200-500 BGN depending on car class'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Payment color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg' ? 'Плащане:' : 'Payment:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'В брой или с кредитна карта при вземане'
                    : 'Cash or credit card upon pickup'
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Payment color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <strong>
                    {currentLang === 'bg'
                      ? 'Възстановяване на депозита:'
                      : 'Deposit refund:'}
                  </strong>
                }
                secondary={
                  currentLang === 'bg'
                    ? 'При връщане на автомобила в добро състояние'
                    : 'When returning the car in good condition'
                }
              />
            </ListItem>
          </List>
        </Paper>

        {/* Contact Information */}
        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            {currentLang === 'bg' ? '6. Контакти' : '6. Contact Information'}
          </Typography>
          <Typography variant="body1" paragraph>
            {currentLang === 'bg'
              ? 'За въпроси относно общите условия или за резервация, моля свържете се с нас:'
              : 'For questions about terms and conditions or for reservations, please contact us:'}
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong> 2013anikar@gmail.com
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Phone:</strong> +359 87 999 4212
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Address:</strong> Западна промишлена зона, Ямбол 8600,
              България
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Business Hours:</strong>{' '}
              {currentLang === 'bg'
                ? 'Понеделник - Петък: 8:00 - 18:00'
                : 'Monday - Friday: 8:00 AM - 6:00 PM'}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
