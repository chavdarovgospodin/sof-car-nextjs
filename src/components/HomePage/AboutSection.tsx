'use client';

import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  CheckCircle,
  CreditCard,
  Security,
  LocalGasStation,
} from '@mui/icons-material';
import Image from 'next/image';

interface AboutSectionProps {
  currentLang: string;
}

export function AboutSection({ currentLang }: AboutSectionProps) {
  return (
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
                <LocalGasStation sx={{ fontSize: 40, color: 'primary.main' }} />
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
  );
}
